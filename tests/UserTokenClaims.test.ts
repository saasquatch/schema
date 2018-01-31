import path from 'path';
const Ajv = require('ajv');

describe("UserTokenClaims", ()=>{

    const ajv = new Ajv();
    ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));


    var validate = ajv.compile(require("../json/UserTokenClaims.schema.json"));
    
    ['UserReadToken-v1', "UserUnauthedToken-v2", "UserWriteToken-v1"].map( file =>{
        test("Test File:" + file, ()=>{
            var valid = validate(require("../examples/" + file + ".json"));
            if (!valid) expect(validate.errors).toBeNull();
            expect(valid).toBeTruthy();
        });
    });
})

function validate(objPath, schemaPath){
    test
}