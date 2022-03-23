import { isValidForSchema, isInvalidForSchema } from "../helpers/Validator";

describe("IntegrationConfig", () => {
  const schemaPath: string = "IntegrationConfig.schema.json";
  isValidForSchema(schemaPath, "integrationconfig/ValidWebhook");
  isInvalidForSchema(schemaPath, "integrationconfig/InvalidWebhook");
});
