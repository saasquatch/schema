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
          type: "array",
          title: "Enabled Webhook Types",
          items: {
            type: "string"
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
          type: "array",
          title: "Enabled Program Ids",
          items: {
            type: "string"
          }
        }
      ],
      default: true
    },
    analytics: {
      oneOf: [{ type: "boolean" }]
      // dates to use?
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
