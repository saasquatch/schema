import Ajv from 'ajv';

const ajv = new Ajv();
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));

export function isValidForSchema(schemaPath: string, ... testInstanceFiles: string[]) {
    var validate = ajv.compile(require(schemaPath));
    
    testInstanceFiles.map( file =>{
        test("Test File:" + file, ()=>{
            var valid = validate(require("../examples/" + file + ".json"));
            if (!valid) expect(validate.errors).toBeNull();
            expect(valid).toBeTruthy();
        });
    });
}