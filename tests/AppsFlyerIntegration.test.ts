import { isValidForSchema } from "../helpers/Validator";

describe("IntegrationConfig", () => {
  const schemaPath: string = "integrations/AppsFlyerRequestBody.schema.json";
  isValidForSchema(schemaPath, "integrations/AppsFlyerRequestBody");
});

describe("IntegrationConfig", () => {
  const schemaPath: string = "integrations/AppsFlyerResponseBody.schema.json";
  isValidForSchema(schemaPath, "integrations/AppsFlyerResponseBody");
});