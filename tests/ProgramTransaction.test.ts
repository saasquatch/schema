import {isValidForSchema, isInvalidForSchema} from '../helpers/Validator';

describe("HtmlWidget", ()=>{
    const schemaPath: string = "../json/ProgramTransaction.schema.json";
    isValidForSchema(schemaPath, 
        "transactions/ProgramTransactionDynamicReward", 
        "transactions/ProgramTransactionOverrideReward",
        "transactions/ProgramTransactionModeration");
    isInvalidForSchema(schemaPath,
        "transactions/ProgramTransactionDynamicOverrideReward");
})