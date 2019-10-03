import { isValidForSchema } from "../helpers/Validator";

describe("Webhook", () => {
  const schemaPath: string = "webhooks/Webhook.schema.json";
  isValidForSchema(
    schemaPath,
    "webhooks/UserCreatedClassicDisabled",
    "webhooks/UserCreatedClassic",
    "webhooks/RewardCreated",
    "webhooks/CouponCreated",
    "webhooks/ReferralStartedClassic",
    "webhooks/ReferralConvertedClassic",
    "webhooks/ReferralStartedClassicDisabled",
    "webhooks/ReferralConvertedClassicDisabled",
    "webhooks/ExportCreated",
    "webhooks/ExportCompleted"
  );
});
