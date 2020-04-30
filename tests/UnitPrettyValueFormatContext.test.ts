import { isValidForSchema } from "../helpers/Validator";

describe("UnitSettings", () => {
  isValidForSchema(
    "UnitPrettyValueFormatContext.schema.json",
    "unitsettings/ValidUnitPrettyValueFormatContext1"
  );
});
