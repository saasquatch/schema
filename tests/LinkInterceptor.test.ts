import { isValidForSchema } from "../helpers/Validator";

describe("IntegrationConfig", () => {
  const schemaPath: string = "integrations/LinkInterceptorRequestBody.schema.json";
  isValidForSchema(schemaPath, "integrations/AppsFlyerRequestBody");
});

describe("IntegrationConfig", () => {
  const schemaPath: string = "integrations/LinkInterceptorResponseBody.schema.json";
  isValidForSchema(schemaPath, "integrations/AppsFlyerResponseBody");
});