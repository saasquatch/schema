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
                      title: "Inlcude User Stats Fields",
                      default: false,
                    },
                  },
                },
              },
            },
          },
        },
        {
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
          properties: {
            type: {
              enum: ["QUERY/REDEEMABLE_REWARD_BALANCE"],
            },
            params: {
              ...redeemableRewardBalanceParams,
            },
          },
        },
        {
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
          properties: {
            type: {
              enum: ["MUTATION/USER"],
            },
            fileRef: {
              type: "string",
              title: "File to Upload",
            },
            params: {
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
          properties: {
            type: {
              enum: ["MUTATION/REFERRAL"],
            },
            params: {
              properties: {
                importEvaluationOptions: {
                  ...mutationEvaluationOptions,
                },
              },
            },
          },
        },
        {
          properties: {
            type: {
              enum: ["MUTATION/USER_EVENT"],
            },
            params: {
              properties: {
                importEvaluationOptions: {
                  ...mutationEvaluationOptions,
                },
              },
            },
          },
        },
        {
          properties: {
            type: {
              enum: ["MUTATION/DELETE_USER"],
            },
            params: {
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
