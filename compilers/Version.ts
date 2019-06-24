import glob from "glob";
import path from "path";
import $RefParser from "json-schema-ref-parser";
import cpFile from "cp-file";

const writerJsonFile = require('write-json-file');

const SCHEMAS_GLOB = "**/*.schema.json";
const YAML_GLOB = "**/*.yaml"
const DOCS_FOLDER = path.resolve(__dirname, "../src/docs", YAML_GLOB);
const SCHEMAS_FOLDER = path.resolve(__dirname, "../src/json", SCHEMAS_GLOB);

function getOutputPath(filePath: string) : string {
  const basePath = path.resolve(__dirname, `../src/json/`);
  const subPath = path.relative(basePath, filePath);
  const subDir = path.dirname(subPath);
  const fileName = path.basename(filePath);
  const outPath = path.resolve(__dirname, `../json/`, subDir, fileName);
  return outPath;
}

async function updateAndWriteJsonSchema(filePath: string){
  const outPath = getOutputPath(filePath);
  const refParser = new $RefParser();
  const parsedExternalRefs = await refParser.bundle(filePath);
  writerJsonFile(outPath, parsedExternalRefs);
  return;
}

async function updateAndWriteYamlFile(filePath: string) {
  const outPath = getOutputPath(filePath);
  await cpFile(filePath, outPath);
  return;
}

glob(SCHEMAS_FOLDER, (err, matches)=>{
  Promise.all(matches.map(updateAndWriteJsonSchema)).catch(e => console.log("Error updating JSON file", e))
})

glob(DOCS_FOLDER, (err, matches)=>{
  Promise.all(matches.map(updateAndWriteYamlFile)).catch(e => console.log("Error copying YAML file", e));
})