import { JSONSchema6 } from "json-schema";

const baseUserContextFields: JSONSchema6["properties"] = {
  id: {
    type: "string",
    title: "User Id",
  },
  accountId: {
    type: "string",
    title: "Account Id",
  },
  firstName: {
    type: ["string", "null"],
    title: "First Name",
  },
  lastName: {
    type: ["string", "null"],
    title: "Last Name",
  },
  imageUrl: {
    type: ["string", "null"],
    title: "Image Url",
  },
  email: {
    type: ["string", "null"],
    title: "Email Address",
  },
  cookieId: {
    type: ["string", "null"],
    title: "Cookie Id",
  },
  locale: {
    type: ["string", "null"],
    title: "Locale",
  },
  countryCode: {
    type: ["string", "null"],
    title: "Country Code",
  },
  referable: {
    type: "boolean",
    title: "Is Referable",
  },
  firstSeenIP: {
    type: ["string", "null"],
    title: "First Seen IP Address",
  },
  lastSeenIP: {
    type: ["string", "null"],
    title: "Last Seen IP Address",
  },
  dateCreated: {
    type: ["integer", "null"],
    title: "Date User Created",
  },
  dateBlocked: {
    type: ["integer", "null"],
    title: "Date User Blocked",
  },
  customFields: {
    $ref: "#/definitions/customFieldsContext",
  },
  segments: {
    type: "array",
    title: "Segments",
    description: "A list of segments this user has been assigned to",
    items: {
      type: "string",
      title: "Segment Key",
      description: "A segment key this user has been assigned to (e.g. VIP)",
    },
  },
  fraudFlags: {
    type: "array",
    title: "Fraud Flags",
    description:
      "Flags indicating whether this user was marked as a potentially fradulent user",
    items: {
      type: "object",
      title: "Fraud Flag",
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
            "BLOCKED_IP",
          ],
        },
        message: {
          type: "string",
          title: "Flag Description",
        },
      },
      required: ["type", "message"],
      additionalProperties: false,
    },
  },
};

const rewardContext: JSONSchema6 = {
  type: "object",
  title: "Reward",
  description: "The set of reward fields",
  properties: {
    id: {
      type: "string",
      title: "Reward Id",
      description: "The reward identifier",
    },
    dateGiven: {
      type: ["string", "null"],
      title: "Date Given",
      description: "The date the reward was given",
    },
    dateExpires: {
      type: ["string", "null"],
      title: "Date Expires",
      description: "The date the reward expires",
    },
    dateCancelled: {
      type: ["string", "null"],
      title: "Date Cancelled",
      description: "The date the reward was cancelled",
    },
    programId: {
      type: ["string", "null"],
      title: "Program Id",
      description: "The identifier of the program that generated this reward",
    },
    programRewardKey: {
      type: "string",
      title: "Program Reward Key",
      description:
        "The reward key assigned by the program that generated this reward",
    },
    referralId: {
      type: "string",
      title: "Referral Id",
      description: "The referral identifier assocaited with this reward",
    },
  },
};

const referralContext: JSONSchema6["properties"] = {
  id: {
    type: "string",
    title: "Referral Id",
    description: "The unique identifier for this referral",
  },
  dateReferralStarted: {
    type: "integer",
    title: "Date Referral Started",
    description: "The date this referral was created (attributed)",
  },
  referrerUser: {
    type: "object",
    title: "Referrer",
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
              "The total number of rewards earned by the referrer in this program",
          },
          data: {
            type: "array",
            title: "Rewards",
            description:
              "A list of the rewards earned by the referrer in this program. (up to 20)",
            items: {
              ...rewardContext,
            },
          },
        },
      },
    },
  },
  rewards: {
    type: "array",
    title: "Referral Rewards",
    description: "A list of rewards associated with this referral",
    items: {
      ...rewardContext,
    },
  },
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
          description: "The number of rewards this user has received",
        },
        data: {
          type: "array",
          title: "The Data Schema",
          description:
            "A list of the rewards this user has received (up to 20)",
          items: {
            ...rewardContext,
          },
        },
      },
      required: ["totalCount", "data"],
      additionalProperties: false,
    },
    referrals: {
      type: "object",
      title: "The Referrals Schema",
      required: ["totalCount"],
      properties: {
        totalCount: {
          type: "integer",
          title: "Total Count",
          description: "The number of referrals this user has made",
        },
      },
    },
    referredByReferral: {
      type: "object",
      title: "Referred By Referral",
      description:
        "The referral where this user was referred. Null when not a referral or partner program.",
      properties: {
        ...referralContext,
        referrerUser: {
          type: "object",
          title: "Referrer",
          description:
            "The referring user, the one that referred the current user",
          properties: {
            ...baseUserContextFields,
          },
        },
      },
    },
  },
};

const customFieldsAndEventsDefinitions: JSONSchema6 = {
  definitions: {
    eventContext: {
      type: "object",
      title: "Event",
      description: "The variables for the event that triggered the program",
      properties: {
        key: {
          type: "string",
          title: "Event Key",
          description: "The key of the evaluated event (e.g. purchase)",
        },
        dateTriggered: {
          type: "integer",
          title: "Date Triggered",
          description: "The date this event was created",
        },
        fields: {
          $ref: "#/definitions/eventFieldsContext",
        },
      },
    },
    eventFieldsContext: {
      type: "object",
      title: "Event Fields",
      description:
        "The body of the event (e.g. a purchase event would have fields for revenue, currency, etc.)",
    },
    customFieldsContext: {
      $ref: "../src/json/UserCustomFields.schema.json#",
    },
  },
};

const contextTimeField: JSONSchema6["properties"] = {
  time: {
    type: "integer",
    title: "Trigger Time",
    description: "The current time at the moment the program is evaluated",
  },
};

export {
  userContext,
  baseUserContextFields,
  contextTimeField,
  customFieldsAndEventsDefinitions,
  referralContext,
};
