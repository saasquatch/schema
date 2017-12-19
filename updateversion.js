const updateJsonFile = require('update-json-file');
const path = require('path');
const pkg = require("./package.json")


const files = [
  "json/SimpleEmail.schema.json",
  "json/HtmlEmail.schema.json",
  "json/ProgramTemplate.schema.json",
  "json/UserCustomFields.schema.json",
  ];

function update(file){
  const id = `https://unpkg.com/${pkg.name}@${pkg.version}/${file}`
  const filePath = path.resolve(__dirname, file)
  return updateJsonFile(filePath, (data) => {
    data.id = id
    return data
  });
}


return Promise.all(files.map(update)).catch(e => console.log("Error updating JSON file", e))