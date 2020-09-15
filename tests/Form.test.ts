import { isValidForSchema, isInvalidForSchema } from "../helpers/Validator";

describe("Form", () => {
  [0, 1].forEach((i) => {
    isValidForSchema(
      "form/FormHandlerRequestBody.schema.json",
      "form/validRequest" + i
    );
  });
  // const schemaPath: string = "TenantJob.schema.json";
  // isValidForSchema(
  //   schemaPath,
  //   "jobs/config/UserMutationDefaultEvaluation",
  //   "jobs/config/UserMutationCustomEvaluation",
  //   "jobs/config/UserMutationPartialEvaluationConfig"
  // );
  // isInvalidForSchema(
  //   schemaPath,
  //   "jobs/config/InvalidUserMutation",
  //   "jobs/config/UserMutationBadConfigName"
  // );
});
