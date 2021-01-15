import {isValidForSchema, isInvalidForSchema} from '../helpers/Validator';

describe("ProgramTransactions", ()=>{
    const schemaPath: string = "ProgramTransaction.schema.json";
    isValidForSchema(schemaPath,
        "programtransactions/ProgramTransactionDynamicReward",
        "programtransactions/ProgramTransactionOverrideReward",
        "programtransactions/ProgramTransactionModeration",
        "programtransactions/ProgramTransactionValidAnalytic1",
        "programtransactions/ProgramTransactionValidAnalytic2",
        "programtransactions/ProgramTransactionGoalAnalytic");
    isInvalidForSchema(schemaPath,
        "programtransactions/ProgramTransactionDynamicOverrideReward",
        "programtransactions/ProgramTransactionInvalidAnalytic1");
})
