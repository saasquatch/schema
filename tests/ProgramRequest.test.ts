import {isValidForSchema} from '../helpers/Validator';

describe("ProgramRequest", ()=>{
    const schemaPath: string = "ProgramRequest.schema.json";
    isValidForSchema(schemaPath, 
        "programrequests/ProgramIntrospection",
        "programrequests/ProgramValidation"); 
 })