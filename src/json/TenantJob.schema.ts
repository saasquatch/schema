import { JSONSchema6 } from "json-schema";
import {
  legacyExportParams,
  redeemableRewardBalanceParams,
  mutationEvaluationOptions,
  rewardBalanceParams,
} from "./jobs/JobParams";

const tenantJobSchema: JSONSchema6 = {
  $schema: "http://json-schema.org/draft-06/schema#",
  title: "Create a Job",
  type: "object",
  required: ["type"],
  properties: {
    type: {
      type: "string",
      title: "Job Type",
      enum: [
        "QUERY/USER",
        "QUERY/USER_EVENT",
        "QUERY/USER_REFERRAL",
        "QUERY/USER_REWARD_BALANCE",
        "QUERY/REWARD_BALANCE",
        "QUERY/REFERRAL",
        "QUERY/REWARD",
        "QUERY/REFERRAL_PARTICIPANT",
        "QUERY/REDEEMABLE_REWARD_BALANCE",
        "QUERY/US_TAXABLE_VALUE",
        "MUTATION/USER",
        "MUTATION/REDEEMABLE_REWARD_BALANCE",
        "MUTATION/USER_STATS",
        "MUTATION/REFERRAL",
        "MUTATION/USER_EVENT",
        "MUTATION/DELETE_USER",
      ],
      default: "MUTATION/USER",
    },
    outputFormat: {
      type: "string",
      title: "Output Format",
      enum: ["CSV", "XLSX"],
      default: "CSV",
    },
    name: {
      type: "string",
      title: "Job Name",
    },
    mailtoEmail: {
      type: "string",
      title: "Notify on job completion:",
    },
    requester: {
      type: "string",
      title: "Requested By",
    },
  },
  dependencies: {
    type: {
      oneOf: [
        {
          type: "object",
          properties: {
            type: {
              enum: ["QUERY/USER"],
            },
            params: {
              type: "object",
              properties: {
                programId: {
                  type: "string",
                  title: "Program Id",
                },
                fields: {
                  type: "object",
                  title: "Fields",
                  properties: {
                    includeUserStatsFields: {
                      type: "boolean",
                      title: "Include User Stats Fields",
                      default: false,
                    },
                    includeProgramShareLinksAndReferralCodes: {
                      type: "boolean",
                      title: "Include Program Share Links and Referral Codes",
                      default: false,
                    },
                    includeSegments: {
                      type: "boolean",
                      title: "Include Segments",
                      default: false,
                    },
                  },
                },
              },
            },
          },
        },
        {
          type: "object",
          properties: {
            type: {
              enum: ["QUERY/USER_EVENT"],
            },
            params: {
              type: "object",
              properties: {
                filter: {
                  type: "object",
                  title: "Filter",
                  description:
                    "A GraphQL filter that defines the user events to be exported.",
                  properties: {
                    id_eq: {
                      type: "string",
                      title: "Event ID equals",
                      description: "Filter for a single user event by ID",
                    },
                    key_eq: {
                      type: "string",
                      title: "Event Key equals",
                      description: "Filter for user events by event key",
                    },
                    key_ne: {
                      type: "string",
                      title: "Event Key not equal",
                      description: "Exclude user events by event key",
                    },
                    key_in: {
                      type: "string",
                      title: "Event Key in",
                      description:
                        "Filter for user events by multiple event keys",
                    },
                    key_nin: {
                      type: "string",
                      title: "Event Key not in",
                      description: "Exclude user events by multiple event keys",
                    },
                    dateTriggered_gte: {
                      type: "number",
                      title: "Date Triggered greater than or equals",
                      description:
                        "Filter for user events triggered after or at a certain timestamp",
                    },
                    dateTriggered_lt: {
                      type: "number",
                      title: "Date Triggered less than",
                      description:
                        "Filter for user events triggered before a certain timestamp",
                    },
                    dateTriggered_interval: {
                      type: "string",
                      title: "Date Triggered interval",
                      description:
                        "Filter for user events triggered between two dates",
                    },
                    dateTriggered_timeframe: {
                      type: "string",
                      title: "Date Triggered timeframe",
                      description:
                        "Filter for user events triggered with a timeframe",
                    },
                    dateReceived_gte: {
                      type: "number",
                      title: "Date Received greater than or equals",
                      description:
                        "Filter for user events received after or at a certain timestamp",
                    },
                    dateReceived_lt: {
                      type: "number",
                      title: "Date Received less than",
                      description:
                        "Filter for user events received before a certain timestamp",
                    },
                    dateReceived_interval: {
                      type: "string",
                      title: "Date Received interval",
                      description:
                        "Filter for user events received between two dates",
                    },
                    dateReceived_timeframe: {
                      type: "string",
                      title: "Date Received timeframe",
                      description:
                        "Filter for user events received with a timeframe",
                    },
                    dateProcessed_gte: {
                      type: "number",
                      title: "Date Processed greater than or equals",
                      description:
                        "Filter for user events processed after or at a certain timestamp",
                    },
                    dateProcessed_lt: {
                      type: "number",
                      title: "Date Processed less than",
                      description:
                        "Filter for user events processed before a certain timestamp",
                    },
                    dateProcessed_interval: {
                      type: "string",
                      title: "Date Processed interval",
                      description:
                        "Filter for user events processed between two dates",
                    },
                    dateProcessed_timeframe: {
                      type: "string",
                      title: "Date Processed timeframe",
                      description:
                        "Filter for user events processed with a timeframe",
                    },
                    userId_eq: {
                      type: "string",
                      title: "User ID equals",
                      description: "Filter for user events by User ID",
                    },
                    accountId_eq: {
                      type: "string",
                      title: "Account ID equals",
                      description: "Filter for user events by Account ID",
                    },
                  },
                },
              },
            },
          },
        },
        {
          type: "object",
          properties: {
            type: {
              enum: ["QUERY/USER_REFERRAL"],
            },
            params: {
              type: "object",
              properties: {
                ...legacyExportParams,
              },
            },
          },
        },
        {
          type: "object",
          properties: {
            type: {
              enum: ["QUERY/USER_REWARD_BALANCE"],
            },
            params: {
              type: "object",
              properties: {
                ...rewardBalanceParams,
              },
            },
          },
        },
        {
          type: "object",
          properties: {
            type: {
              enum: ["QUERY/REWARD_BALANCE"],
            },
            params: {
              type: "object",
              properties: {
                ...rewardBalanceParams,
              },
            },
          },
        },
        {
          type: "object",
          properties: {
            type: {
              enum: ["QUERY/REFERRAL"],
            },
            params: {
              type: "object",
              properties: {
                ...legacyExportParams,
              },
            },
          },
        },
        {
          type: "object",
          properties: {
            type: { enum: ["QUERY/REWARD"] },
            params: {
              type: "object",
              properties: {
                filter: {
                  type: "object",
                  title: "Filter",
                  description:
                    "A GraphQL filter that defines the rewards to be exported. See RewardFilterInput.",
                },
                at: {
                  type: "integer",
                  title: "At",
                  description:
                    "An optional timestamp for exporting the rewards' states at a specific point in time",
                },
                fields: {
                  type: "object",
                  title: "Fields",
                  properties: {
                    includeUserFields: {
                      type: "boolean",
                      title: "Include User Fields",
                      default: false,
                    },
                    includeReferralFields: {
                      type: "boolean",
                      title: "Include Referral Fields",
                      default: false,
                    },
                  },
                },
              },
            },
          },
        },
        {
          type: "object",
          properties: {
            type: {
              enum: ["QUERY/REFERRAL_PARTICIPANT"],
            },
            params: {
              type: "object",
              properties: {
                shareMedium: {
                  type: "string",
                  title: "Share Medium",
                },
                engagementMedium: {
                  type: "string",
                  title: "Engagement Medium",
                },
                ...legacyExportParams,
              },
            },
          },
        },
        {
          type: "object",
          properties: {
            type: {
              enum: ["QUERY/REDEEMABLE_REWARD_BALANCE"],
            },
            params: {
              type: "object",
              ...redeemableRewardBalanceParams,
            },
          },
        },
        {
          type: "object",
          properties: {
            type: {
              enum: ["QUERY/US_TAXABLE_VALUE"],
            },
            params: {
              type: "object",
            },
          },
        },
        {
          type: "object",
          properties: {
            type: {
              enum: ["MUTATION/USER"],
            },
            fileRef: {
              type: "string",
              title: "File to Upload",
            },
            params: {
              type: "object",
              properties: {
                programId: {
                  type: "string",
                  title: "Program Id",
                },
                segments: {
                  type: "array",
                  title: "Segments",
                  items: {
                    type: "string",
                  },
                },
                importEvaluationOptions: {
                  ...mutationEvaluationOptions,
                },
              },
            },
          },
          required: ["fileRef"],
        },
        {
          type: "object",
          properties: {
            type: {
              enum: ["MUTATION/REDEEMABLE_REWARD_BALANCE"],
            },
            fileRef: {
              type: "string",
              title: "File to Upload",
            },
          },
        },
        {
          type: "object",
          properties: {
            type: {
              enum: ["MUTATION/REFERRAL"],
            },
            params: {
              type: "object",
              properties: {
                importEvaluationOptions: {
                  ...mutationEvaluationOptions,
                },
              },
            },
          },
        },
        {
          type: "object",
          properties: {
            type: {
              enum: ["MUTATION/USER_EVENT"],
            },
            params: {
              type: "object",
              properties: {
                importEvaluationOptions: {
                  ...mutationEvaluationOptions,
                },
              },
            },
          },
        },
        {
          type: "object",
          properties: {
            type: {
              enum: ["MUTATION/DELETE_USER"],
            },
            params: {
              type: "object",
              properties: {
                preserveEmptyAccounts: {
                  type: "boolean",
                  title: "Preserve Empty Accounts",
                },
                doNotTrack: {
                  type: "boolean",
                  title: "Do Not Track",
                },
              },
            },
          },
        },
      ],
    },
  },
};

export default tenantJobSchema;
