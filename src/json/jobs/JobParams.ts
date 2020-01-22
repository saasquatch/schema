import { JSONSchema4 } from "json-schema";

const legacyExporParams: JSONSchema4["properties"] = {
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

const rewardBalanceParams: JSONSchema4["properties"] = {
  createdSince: {
    type: "integer",
    title: "Created Since"
  },
  createdBefore: {
    type: "integer",
    title: "Created Before"
  }
};

const redeemableRewardBalanceParams: JSONSchema4["properties"] = {
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

export {
  legacyExporParams,
  rewardBalanceParams,
  redeemableRewardBalanceParams
};
