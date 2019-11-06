import { JSONSchema6 } from "json-schema";
import {
  contextTimeField,
  userContext,
  customFieldsAndEventsDefinitions
} from "./ProgramTriggerSchemaComponents";

const rewardScheduledProgramTriggerContextSchema: JSONSchema6 = {
  $schema: "http://json-schema.org/draft-06/schema#",
  type: "object",
  title: "Reward Scheduled Context",
  description: "Defines the trigger variables available to a REWARD_SCHEDULED trigger",
  properties: {
    type: {
      enum: ["REWARD_SCHEDULED"]
    },
    user: {
      title: "Current User Data",
      ... userContext
    },
    ... contextTimeField
  },
  ... customFieldsAndEventsDefinitions
};

export default rewardScheduledProgramTriggerContextSchema;
