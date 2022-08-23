import { JSONSchema6 } from "json-schema";
import {
  userContext,
  baseUserContextFields,
  contextTimeField,
  customFieldsAndEventsDefinitions,
} from "./ProgramTriggerSchemaComponents";

const afterUserCreatedOrUpdatedTriggerContextSchema: JSONSchema6 = {
  $schema: "http://json-schema.org/draft-06/schema#",
  type: "object",
  title: "After User Created Or Updated Trigger Context",
  description:
    "Defines the trigger variables available to an AFTER_USER_CREATED_OR_UPDATED trigger",
  properties: {
    type: {
      enum: ["AFTER_USER_CREATED_OR_UPDATED"],
    },
    user: {
      title: "Current User",
      ...userContext,
    },
    previous: {
      title: "Previous User",
      type: "object",
      properties: {
        ...baseUserContextFields,
      },
    },
    ...contextTimeField,
  },
  ...customFieldsAndEventsDefinitions,
};

export default afterUserCreatedOrUpdatedTriggerContextSchema;
