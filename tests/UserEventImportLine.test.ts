import { isValidForSchema, isInvalidForSchema } from "../helpers/Validator";

describe("UserEventImportLine", () => {
  const schemaPath: string = "jobs/UserEventImportLine.schema.json";
  isValidForSchema(
    schemaPath,
    ...Array.from({ length: 3 }, (x, i) => i).map(
      (i) => `jobs/userEvent/valid${i}`
    )
  );
  isInvalidForSchema(
    schemaPath,
    ...Array.from({ length: 6 }, (x, i) => i).map(
      (i) => `jobs/userEvent/invalid${i}`
    )
  );
});
