import RefParser from "@apidevtools/json-schema-ref-parser";
import {
  mkdir as mkdirCb,
  readFile as readFileCb,
  writeFile as writeFileCb,
} from "fs";
import glob from "glob";
import { JSONSchema6 } from "json-schema";
import path from "path";

const SCHEMAS_GLOB = "**/*.schema.@(json|ts)";
const SCHEMAS_FOLDER = path.resolve(__dirname, "../src/json", SCHEMAS_GLOB);

const mkdir = (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    mkdirCb(path, { recursive: true }, (err, path) => {
      if (err) {
        reject(err);
      } else {
        resolve(path);
      }
    });
  });
};

const readJsonFile = (path: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    readFileCb(path, { encoding: "utf8" }, (err, contents) => {
      if (err) {
        reject(err);
      } else {
        try {
          const ret = JSON.parse(contents);
          resolve(ret);
        } catch (e) {
          reject(e);
        }
      }
    });
  });
};

const writeFile = (path: string, contents: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    writeFileCb(path, contents, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Combine the program rules schema with the rest of the program template JSON
// into one file. Originally this was all in one file to begin with, but the
// rules JSONschema had to be separated out for proper code generation
async function combineProgramJsonBlob(
  filePath: string,
  outPath: string,
): Promise<void> {
  const rulesContents = await readJsonFile(filePath);
  const templateContents = await readJsonFile(
    path.join(path.dirname(filePath), "program-template.json"),
  );

  const combined = JSON.stringify(
    { ...templateContents, rules: rulesContents },
    null,
    2,
  );

  const programJsonBlobOutput = path.join(
    path.dirname(outPath),
    "program-template.json",
  );
  await writeFile(programJsonBlobOutput, combined);
}

async function resolveReferences(
  filePath: string | JSONSchema6,
  outputPath: string,
): Promise<void> {
  const refParser = new RefParser();
  const parsedExternalRefs = await refParser.bundle(filePath);
  await mkdir(path.dirname(outputPath));
  await writeFile(outputPath, JSON.stringify(parsedExternalRefs, null, 2));
  return;
}

async function update(filePath: string): Promise<void> {
  const basePath = path.resolve(__dirname, `../src/json/`);
  const subPath = path.relative(basePath, filePath);
  const subDir = path.dirname(subPath);
  const fileExt = path.extname(filePath);
  const fileName = path.basename(filePath);
  const outPath = path.resolve(__dirname, `../json/`, subDir, fileName);

  if (fileExt === ".json") {
    await resolveReferences(filePath, outPath);

    if (fileName === "rules.schema.json") {
      await combineProgramJsonBlob(filePath, outPath);
    }
  } else {
    const jsonSchema = await import(filePath);
    await resolveReferences(
      jsonSchema.default as JSONSchema6,
      outPath.replace(".ts", ".json"),
    );
  }
}

glob(SCHEMAS_FOLDER, (_err, matches) => {
  Promise.all(matches.map(update)).catch((e) =>
    console.log("Error updating JSON file", e),
  );
});
