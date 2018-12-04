import {isValidForSchema, isInvalidForSchema} from '../helpers/Validator';

describe("ProgramTransactions", ()=>{
    const schemaPath: string = "../json/ProgramTransaction.schema.json";
    isValidForSchema(schemaPath, 
        "programtransactions/ProgramTransactionDynamicReward", 
        "programtransactions/ProgramTransactionOverrideReward",
        "programtransactions/ProgramTransactionModeration");
    isInvalidForSchema(schemaPath,
        "programtransactions/ProgramTransactionDynamicOverrideReward");
})