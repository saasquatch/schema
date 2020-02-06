import { JSONSchema6 } from "json-schema";
import rewardApiInput from "../RewardApiInput.schema.json";
import userIdentifier from "../UserIdentifier.schema.json";
var jsonata = require("jsonata");

const rewardInput: JSONSchema6 = <JSONSchema6>rewardApiInput;

// only add redemptions to CREDIT reward
const expression = jsonata(`(
    /* add import-only + credit-only params */
    $rewards := $map(**.dependencies.type.oneOf, function($v, $i, $a) {
        $merge([$v, $v.properties.type.enum = ["CREDIT"] ? 
        { "properties": $merge([$v.properties, $creditOnlyRewardProps, $importOnlyRewardProps]) } : 
        { "properties": $merge([$v.properties, $importOnlyRewardProps]) }])
    });
    
    { "type" : { "oneOf": $rewards } };
)`); // TODO add required properties

// add properties that only apply to CREDIT reward types
expression.assign("creditOnlyRewardProps", {
  redemptions: {
    $ref: "#/definitions/redemptions"
  }
});

// add properties that apply to all rewards types but only for the import
expression.assign("importOnlyRewardProps", {
  programRewardKey: {
    type: "string",
    title: "Reward Key"
  },
  dateGiven: {
    type: "integer",
    title: "Date Given"
  },
  userId: {
    type: "string",
    title: "User Id"
  },
  accountId: {
    type: "string",
    title: "Account Id"
  }
});

const dependenciesWithRedemptions: JSONSchema6["dependencies"] = expression.evaluate(
  rewardInput
);
rewardInput.dependencies = dependenciesWithRedemptions;

const referralImport: JSONSchema6 = {
  $schema: "http://json-schema.org/draft-06/schema#",
  type: "object",
  title: "Referral Import Line",
  description:
    "Represents the schema for a single line of the referral import JSONL file",
  properties: {
    referrerUser: {
      ...(<JSONSchema6>userIdentifier)
    },
    referredUser: {
      ...(<JSONSchema6>userIdentifier)
    },
    programId: {
      type: "string",
      title: "Program Id"
    },
    dateReferralStarted: {
      type: "integer",
      title: "Date Referral Started"
    },
    dateConverted: {
      type: "integer",
      title: "Date Converted"
    },
    rewards: {
      $ref: "#/definitions/rewards"
    }
  },
  required: ["programId", "referrerUser", "referredUser"],
  additionalProperties: false,
  definitions: {
    ...(<JSONSchema6>rewardApiInput).definitions,
    rewards: {
      type: "array",
      title: "Rewards",
      items: {
        ...rewardInput
      }
    },
    redemptions: {
      type: "array",
      title: "Redemptions",
      items: {
        type: "object",
        properties: {
          quantityRedeemed: {
            type: "integer",
            title: "Redeemed Amount"
          },
          dateRedeemed: {
            type: "integer",
            title: "Date Redeemed"
          }
        },
        required: ["quantityRedeemed"],
        additionalProperties: false
      }
    }
  }
};

export default referralImport;
