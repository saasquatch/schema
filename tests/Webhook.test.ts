import { isValidForSchema } from "../helpers/Validator";

describe("Webhook", () => {
  const schemaPath: string = "webhooks/Webhook.schema.json";
  isValidForSchema(
    schemaPath,
    "webhooks/ClassicDisabledUserCreated",
    "webhooks/ClassicUserCreated"
  );
});
