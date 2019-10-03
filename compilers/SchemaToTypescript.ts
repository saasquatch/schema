import { compile, compileFromFile } from 'json-schema-to-typescript'
import glob from "glob";
import path from "path";
import fs from "fs";

const SCHEMAS_GLOB = "**/*.schema.json";
const SCHEMAS_BASE = path.resolve(__dirname, "../json");
const SCHEMAS_FOLDER = path.resolve(__dirname, "../json", SCHEMAS_GLOB);
const TYPEDEFS_FOLDER = path.resolve(__dirname, "../src/types")

const HEADER = `/***

SaaSquatch Type Definitions

This file was automatically generated. DO NOT edit it by hand, instead edit the related JSON Schema file.

Generated on ${new Date().toISOString()}


***/

`;


glob(SCHEMAS_FOLDER, async (err, matches) =>{
    console.log("Compiling schemas: ", matches.length);

    const outFile = path.resolve(__dirname, "../index.d.ts"); // index.d.ts is a standard for type definitions
    fs.writeFileSync(outFile, HEADER); // Empties type file

    const outFilePaths = [];
    const outErrors = [];
    for(let filepath of matches){
        try{
            const typedef = await compileFromFile(filepath, {
                bannerComment: "",
                declareExternallyReferenced: true,
                cwd: SCHEMAS_BASE,
                unreachableDefinitions: true
            });
            const filename = path.basename(filepath);
            const baseFileName = filename.split(".")[0];
            fs.appendFileSync(outFile, `// ${filename} \n`)
            fs.appendFileSync(outFile, `// Generated on ${new Date().toISOString()} \n`)
            fs.appendFileSync(outFile, `// This file was automatically generated. DO NOT edit it by hand, instead edit the related JSON Schema file. \n`)
            fs.appendFileSync(outFile, `declare namespace saasquatch.${baseFileName} {\n`)
            fs.appendFileSync(outFile, typedef);
            fs.appendFileSync(outFile, `} // End of ${baseFileName} \n\n\n`)
            outFilePaths.push(filepath);
        }catch(e){
            outErrors.push(filepath);
            outErrors.push(e);
        }
    }

    console.log("Output schemas:", outFilePaths);
    console.log("Output errors:", outErrors);

});