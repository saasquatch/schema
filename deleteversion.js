const updateJsonFile = require('update-json-file');
const path = require('path');
const pkg = require("./package.json")


const files = [
  "HtmlWidget.schema.json",
  "SimpleEmail.schema.json",
  "HtmlEmail.schema.json",
  "ProgramTemplate.schema.json",
  "UserCustomFields.schema.json",
  "ProgramAnalytics.schema.json",
  "PredefinedReward.schema.json",
  "TenantJob.schema.json",
  ];

function update(file){
  const id = `https://unpkg.com/${pkg.name}@${pkg.version}/json/${file}`
  const filePath = path.resolve(__dirname, `./json/`, file)
  return updateJsonFile(filePath, (data) => {
    data.id = `${file}#`;
    return data
  });
}


return Promise.all(files.map(update)).catch(e => console.log("Error updating JSON file", e))