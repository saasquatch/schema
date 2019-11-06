import { JSONSchema6 } from "json-schema";
import afterUserCreatedOrUpdatedTriggerContext from "./AfterUserCreatedOrUpdatedTriggerContext.schema";
import afterUserEventProcessedTriggerContext from "./AfterUserEventProcessedTriggerContext.schema";
import referralTriggerContext from "./ReferralTriggerContext.schema";
import rewardScheduledProgramTriggerContext from "./RewardScheduledProgramTriggerContext.schema";
import scheduledProgramTriggerContext from "./ScheduledProgramTriggerContext.schema";

const programTriggerVariableContextSchema: JSONSchema6 = {
  $schema: "http://json-schema.org/draft-06/schema#",
  type: "object",
  title: "Program Variable Context Schema",
  description:
    "Defines the context used for evaluating externally defined inputs (e.g. JSONata)",
  properties: {
    type: {
      type: "string",
      title: "Trigger Type",
      description:
        "The reason the program was triggered (e.g. referral created, user changed something, etc.)",
      enum: [
        "AFTER_USER_CREATED_OR_UPDATED",
        "SCHEDULED",
        "REWARD_SCHEDULED",
        "REFERRAL",
        "AFTER_USER_EVENT_PROCESSED"
      ]
    }
  },
  dependencies: {
    type: {
      oneOf: [
        {
          ... afterUserCreatedOrUpdatedTriggerContext.properties
        },
        {
          ... rewardScheduledProgramTriggerContext.properties
        },
        {
          ... scheduledProgramTriggerContext.properties
        },
        {
          ... referralTriggerContext.properties
        },
        {
          ... afterUserEventProcessedTriggerContext.properties
        }
      ]
    }
  },
  definitions: {
    ... afterUserCreatedOrUpdatedTriggerContext.definitions,
    ... rewardScheduledProgramTriggerContext.definitions,
    ... scheduledProgramTriggerContext.definitions,
    ... referralTriggerContext.definitions,
    ... afterUserEventProcessedTriggerContext.definitions
  }
};

export default programTriggerVariableContextSchema;
