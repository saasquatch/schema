import {isValidForSchema, isInvalidForSchema} from '../helpers/Validator';

describe("UserCustomFields", ()=>{
    const schemaPath: string = "UserCustomFields.schema.json";
    isValidForSchema(schemaPath, 
        "customfields/ValidCustomFields");
    isInvalidForSchema(schemaPath,
        "customfields/ObjectField");
})