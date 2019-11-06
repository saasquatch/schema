import { JSONSchema6 } from "json-schema";

const programTriggerVariableContextSchema: JSONSchema6 = {
  $schema: "http://json-schema.org/draft-06/schema#",
  type: "object",
  title: "Program Trigger Variables",
  description:
    "Defines the variables used for evaluating externally defined inputs (e.g. JSONata)",
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
  }
};

const programTriggerVariableContextSchema2: JSONSchema6 = {
  $schema: "http://json-schema.org/draft-06/schema#",
  type: "object",
  title: "Program Trigger Variables",
  description:
    "The variables used for evaluating externally defined inputs (e.g. JSONata)",
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
          $ref: "#/definitions/afterUserCreatedOrUpdatedTriggerContext"
        },
        {
          $ref: "#/definitions/rewardScheduledProgramTriggerContext"
        },
        {
          $ref: "#/definitions/scheduledProgramTriggerContext"
        },
        {
          $ref: "#/definitions/referralTriggerContext"
        },
        {
          $ref: "#/definitions/afterUserEventProcessedTriggerContext"
        }
      ]
    }
  },
  definitions: {
    afterUserCreatedOrUpdatedTriggerContext: {
      $ref: "AfterUserCreatedOrUpdatedTriggerContext.schema.json#"
    },
    rewardScheduledProgramTriggerContext: {
      $ref: "RewardScheduledProgramTriggerContext.schema.json#"
    },
    scheduledProgramTriggerContext: {
      $ref: "ScheduledProgramTriggerContext.schema.json#"
    },
    referralTriggerContext: {
      $ref: "ReferralTriggerContext.schema.json#"
    },
    afterUserEventProcessedTriggerContext: {
      $ref: "AfterUserEventProcessedTriggerContext.schema.json#"
    }
  }
};

const baseUserContextFields: JSONSchema6["properties"] = {
  id: {
    type: "string",
    title: "User Id"
  },
  accountId: {
    type: "string",
    title: "Account Id"
  },
  firstName: {
    type: ["string", "null"],
    title: "First Name"
  },
  lastName: {
    type: ["string", "null"],
    title: "Last Name"
  },
  imageUrl: {
    type: ["string", "null"],
    title: "Image Url"
  },
  email: {
    type: ["string", "null"],
    title: "Email Address"
  },
  cookieId: {
    type: ["string", "null"],
    title: "Cookie Id"
  },
  locale: {
    type: ["string", "null"],
    title: "Locale"
  },
  referable: {
    type: "boolean",
    title: "Is Referable"
  },
  firstSeenIP: {
    type: ["string", "null"],
    title: "First Seen Ip"
  },
  lastSeenIP: {
    type: ["string", "null"],
    title: "Last Seen Ip"
  },
  firstSeenGeoData: {
    type: "object",
    title: "First Seen Geodata"
  },
  lastSeenGeoData: {
    type: "object",
    title: "Last Seen Geodata"
  },
  dateCreated: {
    type: ["integer", "null"],
    title: "Date User Created"
  },
  dateBlocked: {
    type: ["integer", "null"],
    title: "Date User Blocked"
  },
  customFields: {
    $ref: "#/definitions/customFieldsContext"
  },
  segments: {
    type: "array",
    title: "User Segements",
    description: "A list of segments this user has been assigned to",
    items: {
      type: "string",
      title: "User Segment",
      description: "A segment this user has been assigned to (e.g. VIP)"
    }
  },
  fraudFlags: {
    type: "array",
    title: "User Fraud Flags",
    description:
      "Flags indicating whether this user was marked as a potentially fradulent user",
    items: {
      type: "object",
      title: "Fraud Flags",
      properties: {
        type: {
          type: "string",
          title: "Flag Type",
          enum: [
            "IP",
            "EMAIL",
            "NAME",
            "RATE",
            "DAILY_REFERRAL_REWARD_LIMIT",
            "TEMP_EMAIL",
            "BLOCKED_USER",
            "BLOCKED_IP"
          ]
        },
        message: {
          type: "string",
          title: "Flag Description"
        }
      },
      required: ["type", "message"],
      additionalProperties: false
    }
  }
};

const rewardContext: JSONSchema6 = {
  type: "object",
  title: "Reward",
  description: "The set of reward fields",
  properties: {
    id: {
      type: "string",
      title: "Reward Id",
      description: "The reward identifier"
    },
    dateGiven: {
      type: ["string", "null"],
      title: "Date Given",
      description: "The date the reward was given"
    },
    dateExpires: {
      type: ["string", "null"],
      title: "Date Expires",
      description: "The date the reward expires"
    },
    dateCancelled: {
      type: ["string", "null"],
      title: "Date Cancelled",
      description: "The date the reward was cancelled"
    },
    programId: {
      type: ["string", "null"],
      title: "Program Id",
      description: "The identifier or the program that generated this reward"
    },
    programRewardKey: {
      type: "string",
      title: "Program Reward Key",
      description:
        "The reward key assigned by the program that generated this reward"
    },
    referralId: {
      type: "string",
      title: "Referral Id",
      description: "The referral identifier assocaited with this reward"
    }
  }
};

const referralContext: JSONSchema6["properties"] = {
  id: {
    type: "string",
    title: "Referral Id",
    description: "The unique identifier for this referral"
  },
  dateReferralStarted: {
    type: "integer",
    title: "Date Referral Started",
    description: "The date this referral was created (attributed)"
  },
  referrerUser: {
    type: "object",
    properties: {
      ...baseUserContextFields,
      rewards: {
        type: "object",
        title: "Rewards",
        description: "Rewards earned in this program by the referrer",
        properties: {
          totalCount: {
            type: "integer",
            title: "Total Count",
            description:
              "The total number of rewards earned by the referrer in this program"
          },
          data: {
            type: "array",
            title: "Rewards",
            description:
              "A list of the rewards earned by the referrer in this program",
            items: {
              ...rewardContext
            }
          }
        }
      }
    }
  },
  rewards: {
    type: "array",
    title: "Referral Rewards",
    description: "A list of rewards associated with this referral",
    items: {
      ...rewardContext
    }
  }
};

const userContext: JSONSchema6 = {
  type: "object",
  properties: {
    ...baseUserContextFields,
    rewards: {
      type: "object",
      title: "Rewards",
      properties: {
        totalCount: {
          type: "integer",
          title: "Total Count",
          description: "The number of rewards this user has received"
        },
        data: {
          type: "array",
          title: "The Data Schema",
          description:
            "A list of the rewards this user has received (up to 20)",
          items: {
            ...rewardContext
          }
        }
      },
      required: ["totalCount", "data"],
      additionalProperties: false
    },
    referrals: {
      type: "object",
      title: "The Referrals Schema",
      required: ["totalCount"],
      properties: {
        totalCount: {
          type: "integer",
          title: "Total Count",
          description: "The number of referrals this user has made"
        }
      }
    },
    referredByReferral: {
      type: "object",
      title: "Referred By Referral",
      description: "The referral where this user was referred",
      properties: {
        ...referralContext,
        referrerUser: {
          type: "object",
          title: "Referred User",
          description: "Referred User",
          properties: {
            ...baseUserContextFields
          }
        }
      }
    }
  }
};

const customFieldsAndEventsDefinitions: JSONSchema6 = {
  definitions: {
    eventContext: {
      type: "object",
      title: "Event",
      description:
        "The context of the event that triggered the program and is currently being evaluated",
      properties: {
        key: {
          type: "string",
          title: "Event Key",
          description: "The key of the evaluated event (e.g. purchase)"
        },
        dateTriggered: {
          type: "integer",
          title: "Date Triggered",
          description: "The date this event was created"
        },
        fields: {
          $ref: "#/definitions/eventFieldsContext"
        }
      }
    },
    eventFieldsContext: {
      type: "object",
      title: "Event Fields",
      description:
        "The body of the event (e.g. a purchase event would have fields for revenue, currency, etc.)"
    },
    customFieldsContext: {
      $ref: "../src/json/UserCustomFields.schema.json#"
    }
  }
};

const contextTimeField: JSONSchema6["properties"] = {
  time: {
    type: "integer",
    title: "Trigger Time",
    description: "The current time at the moment the program is evaluated"
  }
};

export {
  userContext,
  baseUserContextFields,
  contextTimeField,
  customFieldsAndEventsDefinitions,
  referralContext
};

export default programTriggerVariableContextSchema;
