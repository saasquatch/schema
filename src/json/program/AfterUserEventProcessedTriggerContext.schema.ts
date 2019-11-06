import { JSONSchema6 } from "json-schema";
import {
  contextTimeField,
  userContext,
  customFieldsAndEventsDefinitions
} from "./ProgramTriggerSchemaComponents";

const afterUserEventProcessedTriggerContextSchema: JSONSchema6 = {
  $schema: "http://json-schema.org/draft-06/schema#",
  type: "object",
  title: "After User Event Processed Trigger Context",
  description:
    "Defines the trigger variables available to an AFTER_USER_EVENT_PROCESSED trigger",
  properties: {
    type: {
      enum: ["AFTER_USER_EVENT_PROCESSED"]
    },
    user: {
      title: "Current User Data",
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
