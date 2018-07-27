import glob from "glob";
import path from "path";
import $RefParser from "json-schema-ref-parser";

const writerJsonFile = require('write-json-file');

const SCHEMAS_GLOB = "**/*.schema.json";
const SCHEMAS_FOLDER = path.resolve(__dirname, "../src/json", SCHEMAS_GLOB);

async function update(file){
  const filePath = path.resolve(__dirname, `../src/json/`, file)
  const outPath = path.resolve(__dirname, `../json/`, file)

  const refParser = new $RefParser();
  const parsedExternalRefs = await refParser.bundle(filePath);

  writerJsonFile(outPath, parsedExternalRefs);
  return;
}

glob(SCHEMAS_FOLDER, (err, matches)=>{
  Promise.all(matches.map(m => path.basename(m) ).map(update)).catch(e => console.log("Error updating JSON file", e))
})