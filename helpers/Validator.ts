import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ strict: "log" });
ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-06.json"));
addFormats(ajv);

function validate(
  checkValid: boolean,
  schemaPath: string,
  ...testInstanceFiles: string[]
) {
  var validate = ajv.compile(require(`../json/${schemaPath}`));

  testInstanceFiles.forEach((file) => {
    test("Test File: " + file, () => {
      var valid = validate(require(`../examples/${file}.json`));
      if (checkValid) {
        if (!valid) expect(validate.errors).toBeNull();
        expect(valid && checkValid).toBeTruthy();
      } else {
        expect(valid).toBeFalsy();
      }
    });
  });
}

export function isInvalidForSchema(
  schemaPath: string,
  ...testInstanceFiles: string[]
) {
  validate(false, schemaPath, ...testInstanceFiles);
}

export function isValidForSchema(
  schemaPath: string,
  ...testInstanceFiles: string[]
) {
  validate(true, schemaPath, ...testInstanceFiles);
}
