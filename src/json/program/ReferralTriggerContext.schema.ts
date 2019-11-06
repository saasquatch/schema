import { JSONSchema6 } from "json-schema";
import {
  contextTimeField,
  userContext,
  referralContext,
  customFieldsAndEventsDefinitions
} from "./ProgramTriggerSchemaComponents";

const referralTriggerContextSchema: JSONSchema6 = {
  $schema: "http://json-schema.org/draft-06/schema#",
  type: "object",
  title: "Referral Trigger Context",
  description: "Defines the trigger variables available to a REFERRAL trigger",
  properties: {
    type: {
      enum: ["REFERRAL"]
    },
    user: {
      title: "Current User Data",
      ...userContext
    },
    referral: {
      type: "object",
      title: "Referral",
      description: "The referral associated with this referral trigger",
      properties: {
        ...referralContext
      }
    },
    ...contextTimeField
  },
  ...customFieldsAndEventsDefinitions
};

export default referralTriggerContextSchema;
