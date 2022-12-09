import fs from "fs";
import glob from "glob";
import { compileFromFile } from "json-schema-to-typescript";
import path from "path";

const SCHEMAS_GLOB = "**/*.schema.json";
const SCHEMAS_BASE = path.resolve(__dirname, "../json");
const SCHEMAS_FOLDER = path.resolve(__dirname, "../json", SCHEMAS_GLOB);
const TYPEDEFS_FOLDER = path.resolve(__dirname, "../src/types");

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

glob(SCHEMAS_FOLDER, async (err, matches) => {
  console.log("Compiling schemas: ", matches.length);

  const rootOut = path.resolve(__dirname, "../types/index.js");
  const rootDTsOut = path.resolve(__dirname, "../types/index.d.ts");

  if (!fs.existsSync(path.dirname(rootOut))) {
    fs.mkdirSync(path.dirname(rootOut), { recursive: true });
  }

  fs.writeFileSync(rootOut, "module.exports = {}");
  fs.writeFileSync(rootDTsOut, "");

  const outFilePaths = [];
  const outErrors = [];
  for (let filepath of matches) {
    try {
      const filename = path.basename(filepath);
      const relativePath = path.relative(SCHEMAS_BASE, filepath);
      const relativeBaseName = relativePath.replace(".schema.json", "");

      const indexFolder = path.resolve(
        __dirname,
        "../types/",
        relativeBaseName
      );

      fs.mkdirSync(indexFolder, { recursive: true });

      // index.js file is needed so the types can be imported by the consuming module
      const indexOut = path.resolve(
        __dirname,
        "../types/",
        relativeBaseName,
        "index.js"
      );

      const indexDTsOut = path.resolve(
        __dirname,
        "../types/",
        relativeBaseName,
        "index.d.ts"
      );

      fs.writeFileSync(indexOut, "module.exports = {}");
      fs.writeFileSync(indexDTsOut, HEADER); // Empties type file

      const typedef = await compileFromFile(filepath, {
        bannerComment: "",
        declareExternallyReferenced: true,
        cwd: SCHEMAS_BASE,
        unreachableDefinitions: true,
        ignoreMinAndMaxItems: true,
        format: false,
      });

      fs.appendFileSync(indexDTsOut, `/*** \n * ${filename}\n`);
      fs.appendFileSync(
        indexDTsOut,
        ` * Generated on ${new Date().toISOString()}\n`
      );
      fs.appendFileSync(
        indexDTsOut,
        ` * This file was automatically generated. DO NOT edit it by hand, instead edit the related JSON Schema file.\n ***/\n\n`
      );
      fs.appendFileSync(indexDTsOut, typedef);
      outFilePaths.push(filepath);
    } catch (e) {
      outErrors.push(filepath);
      outErrors.push(e);
    }
  }

  console.log("Output schemas:", outFilePaths);
  console.log("Output errors:", outErrors);
});
