import glob from "glob";
import path from "path";
import $RefParser from "json-schema-ref-parser";
import { JSONSchema6 } from "json-schema";

const writerJsonFile = require("write-json-file");

const SCHEMAS_GLOB = "**/*.schema.@(json|ts)";
const SCHEMAS_FOLDER = path.resolve(__dirname, "../src/json", SCHEMAS_GLOB);

async function resolveReferences(
  filePath: string | JSONSchema6,
  outputPath: string
) {
  const refParser = new $RefParser();
  refParser.bundle("baseUrl", filePath, {}); // TODO - will baseUrl work with file resolver?
  
  const parsedExternalRefs = await refParser.bundle(filePath);
  writerJsonFile(outputPath, parsedExternalRefs);
}

async function update(filePath: string) {
  const basePath = path.resolve(__dirname, `../src/json/`);
  const subPath = path.relative(basePath, filePath);
  const subDir = path.dirname(subPath);
  const fileExt = path.extname(filePath);
  const fileName = path.basename(filePath);
  const outPath = path.resolve(__dirname, `../json/`, subDir, fileName);

  if (fileExt === ".json") {
    resolveReferences(filePath, outPath);
  } else {
    const jsonSchema = await import(filePath);
    //console.log("jsonSchema: ", JSON.stringify(jsonSchema));
    resolveReferences(
      jsonSchema.default as JSONSchema6,
      outPath.replace(".ts", ".json")
    );
  }
  return;
}

glob(SCHEMAS_FOLDER, (err, matches) => {
  Promise.all(matches.map(update)).catch(e =>
    console.log("Error updating JSON file", e)
  );
});
