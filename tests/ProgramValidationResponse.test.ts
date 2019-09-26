import {isValidForSchema, isInvalidForSchema} from '../helpers/Validator';

describe("ProgramValidationResponse", ()=>{
    const schemaPath: string = "ProgramValidationResponse.schema.json";
    isValidForSchema(schemaPath, 
        "programvalidationresponse/ValidProgramValidationResponse"); 
    isInvalidForSchema(schemaPath, 
        "programvalidationresponse/InvalidProgramValidationResponse");
 })