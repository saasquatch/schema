import { JSONSchema6 } from "json-schema";
import {
  contextTimeField,
  userContext,
  customFieldsAndEventsDefinitions
} from "./ProgramTriggerVariableContext.schema";

const rewardScheduledProgramTriggerContextSchema: JSONSchema6 = {
  $schema: "http://json-schema.org/draft-06/schema#",
  type: "object",
  title: "Reward Scheduled Trigger Variables",
  description: "Defines the trigger variables available to a REWARD_SCHEDULED trigger",
  properties: {
    type: {
      enum: ["REWARD_SCHEDULED"]
    },
    user: {
      title: "User",
      ... userContext
    },
    ... contextTimeField
  },
  ... customFieldsAndEventsDefinitions
};

export default rewardScheduledProgramTriggerContextSchema;
