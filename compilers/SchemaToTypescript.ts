import fs from "fs";
import glob from "glob";
import { compileFromFile } from "json-schema-to-typescript-with-deps";
import path from "path";

const SCHEMAS_GLOB = "**/*.schema.json";
const SCHEMAS_BASE = path.resolve(__dirname, "../json");
const SCHEMAS_FOLDER = path.resolve(__dirname, "../json", SCHEMAS_GLOB);

const HEADER = `/***
 * 
 * SaaSquatch Type Definitions
 * 
 * This file was automatically generated. DO NOT edit it by hand, instead edit the related JSON Schema file.
 * 
 * Generated on ${new Date().toISOString()}
 * 
 ***/

`;

glob(SCHEMAS_FOLDER, async (_err, matches) => {
  console.log("Compiling schemas: ", matches.length);

  const rootDTsOut = path.resolve(__dirname, "../index.d.ts");
  fs.writeFileSync(rootDTsOut, HEADER);

  const outFilePaths = [];
  const outErrors = [];
  for (let filepath of matches) {
    try {
      const filename = path.basename(filepath);
      const baseFileName = filename.replace(".schema.json", "");
      const relativePath = path.relative(SCHEMAS_BASE, filepath);
      const relativeBaseName = relativePath.replace(".schema.json", "");

      const indexFolder = path.resolve(
        __dirname,
        "../types/",
        relativeBaseName,
      );

      fs.mkdirSync(indexFolder, { recursive: true });

      // index.js file is needed so the types can be imported by the consuming module
      const indexOut = path.resolve(
        __dirname,
        "../types/",
        relativeBaseName,
        "index.js",
      );

      const indexDTsOut = path.resolve(
        __dirname,
        "../types/",
        relativeBaseName,
        "index.d.ts",
      );

      fs.writeFileSync(indexOut, "module.exports = {}");
      fs.writeFileSync(indexDTsOut, HEADER); // Empties type file

      const typedef = await compileFromFile(filepath, {
        bannerComment: "",
        declareExternallyReferenced: true,
        cwd: SCHEMAS_BASE,
        unreachableDefinitions: true,
        ignoreMinAndMaxItems: true,
        // set additionalProperties to false for program rules schemas. this cannot
        // be set to false everywhere because it would be a breaking change
        additionalProperties:
          filename === "rules.schema.json" ? false : undefined,
        format: false,
      });

      fs.appendFileSync(indexDTsOut, `/*** \n * ${filename}\n`);
      fs.appendFileSync(
        indexDTsOut,
        ` * Generated on ${new Date().toISOString()}\n`,
      );
      fs.appendFileSync(
        indexDTsOut,
        ` * This file was automatically generated. DO NOT edit it by hand, instead edit the related JSON Schema file.\n ***/\n\n`,
      );
      fs.appendFileSync(indexDTsOut, typedef);

      // append the types to the root index.d.ts for backward compatibility
      fs.appendFileSync(
        rootDTsOut,
        `// Start of ${baseFileName}\n\n\n` +
          `declare namespace saasquatch.${baseFileName} {\n`,
      );
      fs.appendFileSync(rootDTsOut, typedef);
      fs.appendFileSync(rootDTsOut, `} // End of ${baseFileName}\n\n\n`);
      outFilePaths.push(filepath);
    } catch (e) {
      outErrors.push(filepath);
      outErrors.push(e);
    }
  }

  console.log("Output schemas:\n", outFilePaths.join("\n"));
  console.log("Output errors:", outErrors);
});
