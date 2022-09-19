import { isValidForSchema, isInvalidForSchema } from "../helpers/Validator";

describe("UserMetric", () => {
  isValidForSchema(
    "UserMetric.schema.json",
    "usermetric/PartnersFirstPurchase",
    "usermetric/VIPMetricCurrency",
    "usermetric/VIPMetricNoCurrency",
    "usermetric/VIPMetricDefaultCurrency"
  );
});
