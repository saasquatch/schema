import { isValidForSchema, isInvalidForSchema } from "../helpers/Validator";

describe("UnitSettings", () => {
  isValidForSchema(
    "UnitPrettyValueFormatContext.schema.json",
    ...rangeFrom0(3).map(
      (idx) => `unitsettings/ValidUnitPrettyValueFormatContext${idx}`
    )
  );
  isInvalidForSchema(
    "UnitPrettyValueFormatContext.schema.json",
    ...rangeFrom0(2).map(
      (idx) => `unitsettings/InvalidUnitPrettyValueFormatContext${idx}`
    )
  );
});

function rangeFrom0(count: number) {
  return Array.from(new Array(count), (x, i) => i);
}
