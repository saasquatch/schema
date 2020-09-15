import { isValidForSchema, isInvalidForSchema } from "../helpers/Validator";

describe("Form", () => {
  [0, 1].forEach((i) => {
    isValidForSchema(
      "form/FormHandlerRequestBody.schema.json",
      "form/validRequest" + i
    );
  });
  [0, 1, 2].forEach((i) => {
    isInvalidForSchema(
      "form/FormHandlerRequestBody.schema.json",
      "form/invalidRequest" + i
    );
  });
});
