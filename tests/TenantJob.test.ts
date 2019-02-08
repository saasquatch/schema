import {isValidForSchema, isInvalidForSchema} from '../helpers/Validator';

describe("TenantJob", ()=>{
    const schemaPath: string = "TenantJob.schema.json";
    isValidForSchema(schemaPath, 
        "tenantjobs/UserImportJob");
})