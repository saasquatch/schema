import * as Ajv from 'ajv';

describe("HtmlWidget", ()=>{
    
    const ajv = new Ajv();
    ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));

    var validate = ajv.compile(require("../json/HtmlWidget.schema.json"));

    ['htmlwidget/valid-vanilla'].map( file =>{
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