import {isValidForSchema, isInvalidForSchema} from '../helpers/Validator';

describe("RewardApiInput", ()=>{
    const schemaPath: string = "../json/RewardApiInput.schema.json";
    isValidForSchema(schemaPath, 
        "rewardapiinput/ValidPercentDiscountReward",
        "rewardapiinput/ValidCreditReward",
        "rewardapiinput/ValidFuelTankReward",
        "rewardapiinput/ValidIntegrationReward"
    );
    isInvalidForSchema(schemaPath,
        "rewardapiinput/InvalidIntegrationReward",
        "rewardapiinput/InvalidIntegrationReward2");
})