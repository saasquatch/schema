import { isValidForSchema, isInvalidForSchema } from "../helpers/Validator";

describe("ProgramValidationResponse", () => {
  const schemaPath: string = "jobs/ReferralImportLine.schema.json";
  isValidForSchema(
    schemaPath,
    "jobs/referral/ReferralStartedNoRewards",
    "jobs/referral/ValidRewardRedemption"
  );
  isInvalidForSchema(
    schemaPath,
    "jobs/referral/NoProgramId",
    "jobs/referral/InvalidRewardRedemption"
  );
});
