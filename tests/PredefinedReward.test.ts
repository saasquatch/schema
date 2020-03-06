import { isValidForSchema } from "../helpers/Validator";

describe("PredefinedReward", () => {
  const schemaPath: string = "PredefinedReward.schema.json";
  isValidForSchema(
    schemaPath,
    "predefinedreward/PercentDiscountReward",
    "predefinedreward/CreditReward",
    "predefinedreward/FuelTankReward",
    "predefinedreward/IntegrationReward"
  );
});
