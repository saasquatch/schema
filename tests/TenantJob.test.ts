import { isValidForSchema, isInvalidForSchema } from "../helpers/Validator";

describe("TenantJob", () => {
  const schemaPath: string = "TenantJob.schema.json";
  isValidForSchema(
    schemaPath,
    "jobs/config/UserMutationDefaultEvaluation",
    "jobs/config/UserMutationCustomEvaluation",
    "jobs/config/UserMutationPartialEvaluationConfig"
  );
  isInvalidForSchema(
    schemaPath,
    "jobs/config/InvalidUserMutation",
    "jobs/config/UserMutationBadConfigName"
  );
});
