import { JSONSchema6 } from "json-schema";

const legacyExporParams: JSONSchema6["properties"] = {
  createdSince: {
    type: "integer",
    title: "Created Since"
  },
  createdBefore: {
    type: "integer",
    title: "Created Before"
  },
  updatedSince: {
    type: "integer",
    title: "Updated Since"
  },
  updatedBefore: {
    type: "integer",
    title: "Updated Before"
  },
  createdOrUpdatedSince: {
    type: "integer",
    title: "Created Or Updated Since"
  },
  createdOrUpdatedBefore: {
    type: "integer",
    title: "Created Or Updated Before"
  }
};

const rewardBalanceParams: JSONSchema6["properties"] = {
  createdSince: {
    type: "integer",
    title: "Created Since"
  },
  createdBefore: {
    type: "integer",
    title: "Created Before"
  }
};

const redeemableRewardBalanceParams: JSONSchema6 = {
  properties: {
    filter: {
      type: "object",
      title: "Redeemable Reward Balance Filter",
      properties: {
        type_eq: {
          type: "string",
          enum: ["PCT_DISCOUNT", "CREDIT", "FUELTANK", "INTEGRATION"]
        },
        unit_eq: {
          type: "string"
        },
        unit_in: {
          type: "array",
          items: {
            type: "string"
          }
        },
        unitType_eq: {
          type: "string"
        },
        currency_eq: {
          type: "string"
        }
      }
    }
  }
};

const mutationEvaluationOptions: JSONSchema6 = {
  type: "object",
  properties: {
    webhooks: {
      oneOf: [
        {
          type: "boolean",
          title: "Webhooks Enabled",
          description: "If true then all triggered webhook types will be sent"
        },
        {
          type: "object",
          properties: {
            enabledWebhookTypes: {
              type: "array",
              title: "Enabled Webhook Types",
              items: {
                type: "string"
              }
            }
          }
        }
      ],
      default: true
    },
    programs: {
      oneOf: [
        {
          type: "boolean",
          title: "Program Evaluation Enabled",
          description:
            "If true then all applicable active programs will be triggered"
        },
        {
          type: "object",
          properties: {
            enabledProgramIds: {
              type: "array",
              title: "Enabled Program Ids",
              items: {
                type: "string",
                enum: [
                  "user.created",
                  "coupon.created",
                  "reward.created",
                  "referral.started",
                  "referral.converted",
                  "export.created",
                  "export.completed",
                  "user.reward.balance.changed",
                  "email.referred.reward.earned",
                  "email.referral.started",
                  "email.referral.paid",
                  "email.referral.rewardLimitReached",
                  "referral.automoderation.complete",
                  "referral.ended",
                  "theme.publish.finished"
                ]
              }
            }
          }
        }
      ],
      default: true
    },
    analytics: {
      oneOf: [
        { type: "boolean", title: "Analytics Tracking Enabled" },
        {
          type: "object",
          properties: {
            enabledAnalyticsEventCollections: {
              type: "array",
              title: "Analytics Event Collections",
              items: {
                type: "object",
                properties: {
                  collectionName: {
                    type: "string",
                    title: "Collection Name",
                    enum: [
                      "USER_CREATED_EVENT",
                      "USER_REFERRAL_PROGRAM_LOADED_EVENT",
                      "USER_REFERRAL_PROGRAM_ENGAGEMENT_EVENT",
                      "USER_REFERRAL_SHARE_LINK_CLICKED_EVENT",
                      "USER_REFERRAL_CREATED_EVENT",
                      "USER_APPROVED_REFERRAL_CREATED_EVENT",
                      "USER_REFERRAL_MODERATED_EVENT",
                      "USER_REFERRAL_CONVERTED_EVENT",
                      "USER_APPROVED_REFERRAL_CONVERTED_EVENT",
                      "USER_REFERRAL_ENDED_EVENT",
                      "REWARD_CREATED_EVENT",
                      "REWARD_REDEEMED_EVENT",
                      "PROGRAM_EVALUATED",
                      "USER_ACTIVITY",
                      "PROGRAM_GOAL"
                    ]
                  },
                  analyticTimestampSource: {
                    type: "string",
                    enum: ["CURRENT_DATE", "HISTORIC_ANALYTIC_DATE"] // TODO - specs on what HISTORIC_ANALYTIC_DATE means for each event type
                  }     
                }
              }
            }
          }
        }
      ]
    },
    userMetrics: {
      oneOf: [{ type: "boolean" }]
      // TBD? - internal user seen event?
    }
  }
};

export {
  legacyExporParams,
  rewardBalanceParams,
  mutationEvaluationOptions,
  redeemableRewardBalanceParams
};
