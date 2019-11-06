import { JSONSchema6 } from "json-schema";
import {
  contextTimeField,
  userContext,
  customFieldsAndEventsDefinitions
} from "./ProgramTriggerVariableContext.schema";

const afterUserEventProcessedTriggerContextSchema: JSONSchema6 = {
  $schema: "http://json-schema.org/draft-06/schema#",
  type: "object",
  title: "Event Trigger Variables",
  description:
    "Defines the trigger variables available to an AFTER_USER_EVENT_PROCESSED trigger",
  properties: {
    type: {
      enum: ["AFTER_USER_EVENT_PROCESSED"]
    },
    user: {
      title: "User Data",
      ...userContext
    },
    event: {
      $ref: "#/definitions/eventContext"
    },
    ...contextTimeField
  },
  ...customFieldsAndEventsDefinitions
};

export default afterUserEventProcessedTriggerContextSchema;
