const updateJsonFile = require('update-json-file');
const path = require('path');
const pkg = require("./package.json")


const file = "json/SimpleEmail.schema.json";
const id = `https://unpkg.com/${pkg.name}@${pkg.version}/${file}`

const filePath = path.resolve(__dirname, file)

return updateJsonFile(filePath, (data) => {
  data.id = id
  return data
}).catch(e => console.log("Error updating JSON file", e))