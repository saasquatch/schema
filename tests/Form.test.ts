import { isValidForSchema, isInvalidForSchema } from "../helpers/Validator";

describe("Form", () => {
  isValidForSchema(
    "form/FormHandlerRequestBody.schema.json",
    ...Array.from({ length: 2 }, (x, i) => i).map(
      (i) => "form/validRequest" + i
    )
  );
  isInvalidForSchema(
    "form/FormHandlerRequestBody.schema.json",
    ...Array.from({ length: 3 }, (x, i) => i).map(
      (i) => "form/invalidRequest" + i
    )
  );
});
