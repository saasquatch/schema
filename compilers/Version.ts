import glob from "glob";
import path from "path";

const updateJsonFile = require('update-json-file');

const SCHEMAS_GLOB = "**/*.schema.json";
const SCHEMAS_FOLDER = path.resolve(__dirname, "../json", SCHEMAS_GLOB);

function update(file){
  const filePath = path.resolve(__dirname, `../json/`, file)
  /*return updateJsonFile(filePath, (data) => {
    return data
  }); */
}

glob(SCHEMAS_FOLDER, (err, matches)=>{
  //Promise.all(matches.map(m => path.basename(m) ).map(update)).catch(e => console.log("Error updating JSON file", e))
})