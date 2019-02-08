import glob from "glob";
import path from "path";
import $RefParser from "json-schema-ref-parser";
import resolveAllOf from "json-schema-resolve-allof";

const writerJsonFile = require('write-json-file');

const SCHEMAS_GLOB = "**/*.schema.json";
const SCHEMAS_FOLDER = path.resolve(__dirname, "../src/json", SCHEMAS_GLOB);

async function update(filePath: string){
  const basePath = path.resolve(__dirname, `../src/json/`);
  const subPath = path.relative(basePath, filePath);
  const subDir = path.dirname(subPath);
  const fileName = path.basename(filePath);
  const outPath = path.resolve(__dirname, `../json/`, subDir, fileName);

  const refParser = new $RefParser();
  const parsedExternalRefs = await refParser.bundle(filePath);
  resolveAllOf(parsedExternalRefs);

  writerJsonFile(outPath, parsedExternalRefs);
  return;
}

glob(SCHEMAS_FOLDER, (err, matches)=>{
  Promise.all(matches.map(update)).catch(e => console.log("Error updating JSON file", e))
})