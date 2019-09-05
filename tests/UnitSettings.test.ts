import { isValidForSchema } from "../helpers/Validator";

describe("UnitSettings", () => {
  isValidForSchema(
    "UnitSettings.schema.json",
    "unitsettings/ValidUnitSettings"
  );
});
