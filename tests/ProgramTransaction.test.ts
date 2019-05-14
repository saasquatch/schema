import {isValidForSchema, isInvalidForSchema} from '../helpers/Validator';

describe("ProgramTransactions", ()=>{
    const schemaPath: string = "ProgramTransaction.schema.json";
    isValidForSchema(schemaPath, 
        "programtransactions/ProgramTransactionDynamicReward", 
        "programtransactions/ProgramTransactionOverrideReward",
        "programtransactions/ProgramTransactionModeration",
        "programtransactions/ProgramTransactionValidAnalytic",
        "programtransactions/ProgramTransactionGoalAnalytic");
    isInvalidForSchema(schemaPath,
        "programtransactions/ProgramTransactionDynamicOverrideReward",
        "programtransactions/ProgramTransactionInvalidAnalytic1",
        "programtransactions/ProgramTransactionInvalidAnalytic2");
})