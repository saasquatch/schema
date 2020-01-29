import { isValidForSchema, isInvalidForSchema } from "../helpers/Validator";

describe("TenantJob", () => {
  const schemaPath: string = "TenantJob.schema.json";
  isValidForSchema(schemaPath, "jobs/config/UserMutationDefaults");
  isInvalidForSchema(schemaPath, "jobs/config/InvalidUserMutation");
});
