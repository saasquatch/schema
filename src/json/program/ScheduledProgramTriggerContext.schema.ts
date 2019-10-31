import { JSONSchema6 } from "json-schema";
import {
  contextTimeField,
  userContext,
  customFieldsAndEventsDefinitions
} from "./ProgramTriggerVariableContext.schema";

const scheduledProgramTriggerContextSchema: JSONSchema6 = {
  $schema: "http://json-schema.org/draft-06/schema#",
  type: "object",
  title: "Scheduled Context",
  description: "Defines the trigger variables available to a SCHEDULED trigger",
  properties: {
    type: {
      enum: ["SCHEDULED"]
    },
    user: {
      title: "Current User Data",
      ...userContext
    },
    ...contextTimeField
  },
  ...customFieldsAndEventsDefinitions
};

export default scheduledProgramTriggerContextSchema;
