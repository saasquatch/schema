import { isValidForSchema, isInvalidForSchema } from "../helpers/Validator";

describe("IntegrationTemplate", () => {
  const schemaPath: string = "IntegrationTemplate.schema.json";
  isValidForSchema(schemaPath, "integrationconfig/ValidIntegration");
});
