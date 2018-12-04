import { isValidForSchema, isInvalidForSchema } from '../helpers/Validator';

describe("ProgramTemplate", () => {
    const schemaPath: string = "../json/ProgramTemplate.schema.json";
    // TODO - we can't validate these until we remove invalid schema attributes like '"format" : tabs', but some forms may still rely on those
    // isValidForSchema(schemaPath,
    //     "programtemplates/Partner");
});