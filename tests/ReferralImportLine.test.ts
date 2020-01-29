import { isValidForSchema, isInvalidForSchema } from "../helpers/Validator";

describe("ProgramValidationResponse", () => {
  const schemaPath: string = "jobs/ReferralImportLine.schema.json";
  isValidForSchema(
    schemaPath,
    "jobs/referral/ReferredAndReferrerReward",
    "jobs/referral/ReferrerReward"
  );
});
