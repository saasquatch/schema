import { isValidForSchema, isInvalidForSchema } from "../helpers/Validator";

describe("ProgramValidationResponse", () => {
  const schemaPath: string = "jobs/UserImportLine.schema.json";
  isValidForSchema(
    schemaPath,
    "jobs/user/UserWithNoCodes"
  );
});
