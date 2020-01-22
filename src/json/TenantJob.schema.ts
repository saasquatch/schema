import { JSONSchema4 } from "json-schema";
import {
  legacyExporParams,
  redeemableRewardBalanceParams,
  rewardBalanceParams
} from "./jobs/JobParams";

const tenantJobSchema: JSONSchema4 = {
  $schema: "http://json-schema.org/draft-04/schema#",
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
        "QUERY/REFERRAL_PARTICIPANT",
        "QUERY/REDEEMABLE_REWARD_BALANCE",
        "MUTATION/USER",
        "MUTATION/REDEEMABLE_REWARD_BALANCE",
        "MUTATION/USER_STATS"
      ],
      enumNames: [
        "Export: User",
        "Export: Users & Referrals",
        "Export: Users & Reward Balances",
        "Export: Reward Balances",
        "Export: Referrals",
        "Export: Referral Participants",
        "Export: Available Reward Balances",
        "Import: User",
        "Import: Bulk Redemption",
        "Update: User Statistics"
      ],
      default: "MUTATION/USER"
    },
    outputFormat: {
      type: "string",
      title: "Output Format",
      enum: ["CSV", "XLS"],
      default: "CSV"
    },
    name: {
      type: "string",
      title: "Job Name"
    },
    mailtoEmail: {
      type: "string",
      title: "Notify on job completion:"
    },
    requester: {
      type: "string",
      title: "Requested By"
    }
  },
  dependencies: {
    type: {
      oneOf: [
        {
          properties: {
            type: {
              enum: ["QUERY/USER"]
            },
            params: {
              type: "object",
              properties: {
                programId: {
                  type: "string",
                  title: "Program Id"
                },
                ...legacyExporParams
              }
            }
          }
        },
        {
          properties: {
            type: {
              enum: ["QUERY/USER_REFERRAL"]
            },
            params: {
              type: "object",
              properties: {
                ...legacyExporParams
              }
            }
          }
        },
        {
          properties: {
            type: {
              enum: ["QUERY/USER_REWARD_BALANCE"]
            },
            params: {
              type: "object",
              properties: {
                ...rewardBalanceParams
              }
            }
          }
        },
        {
          properties: {
            type: {
              enum: ["QUERY/REWARD_BALANCE"]
            },
            params: {
              type: "object",
              properties: {
                ...rewardBalanceParams
              }
            }
          }
        },
        {
          properties: {
            type: {
              enum: ["QUERY/REFERRAL"]
            },
            params: {
              type: "object",
              properties: {
                ...legacyExporParams
              }
            }
          }
        },
        {
          properties: {
            type: {
              enum: ["QUERY/REFERRAL_PARTICIPANT"]
            },
            params: {
              type: "object",
              properties: {
                shareMedium: {
                  type: "string",
                  title: "Share Medium"
                },
                engagementMedium: {
                  type: "string",
                  title: "Engagement Medium"
                },
                ... legacyExporParams
              }
            }
          }
        },
        {
          properties: {
            type: {
              enum: ["QUERY/REDEEMABLE_REWARD_BALANCE"]
            },
            params: {
                type: "object",
                properties: {
                  ...redeemableRewardBalanceParams
                }
            }
          }
        },
        {
          properties: {
            type: {
              enum: ["MUTATION/USER"]
            },
            fileRef: {
              type: "string",
              title: "File to Upload"
            },
            params: {
              properties: {
                programId: {
                  type: "string",
                  title: "Program Id"
                },
                segments: {
                  type: "array",
                  title: "Segments",
                  items: {
                    type: "string"
                  }
                }
              }
            }
          },
          required: ["fileRef"]
        },
        {
          properties: {
            type: {
              enum: ["MUTATION/REDEEMABLE_REWARD_BALANCE"]
            },
            fileRef: {
              type: "string",
              title: "File to Upload"
            }
          }
        }
      ]
    }
  }
};

export default tenantJobSchema;
