import { JSONSchema6 } from "json-schema";
import rewardApiInput from "../RewardApiInput.schema.json";
import userIdentifier from "../UserIdentifier.schema.json";
var jsonata = require("jsonata");

const rewardInput: JSONSchema6 = <JSONSchema6>rewardApiInput;

// only add redemptions to CREDIT reward
const expression = jsonata(`(
	/* add redemptions to CREDIT reward */
    $creditConfig := **.dependencies.type.oneOf[].properties[type.enum = ["CREDIT"]];
    $creditOnlyRewardProps := $merge([$creditConfig[0], $redemptions]);
    
    /* replace existing credit reward */
    $rewards := $map(**.dependencies.type.oneOf, function($v, $i, $a) {
        $v.properties.type.enum = ["CREDIT"] ? 
        { "properties": $merge([$creditOnlyRewardProps, $importOnlyRewardProps]) } : 
        { "properties": $merge([$v.properties, $importOnlyRewardProps]) }
    });
    
    { "type" : { "oneOf": $rewards } };
)`);
expression.assign("creditOnlyRewardProps", {
  redemptions: {
    $ref: "#/definitions/redemptions"
  }
});
expression.assign("importOnlyRewardProps", {
  programRewardKey: {
    type: "string",
    title: "Reward Key"
  },
  dateGiven: {
    type: "integer",
    title: "Date Given"
  }
});
const dependenciesWithRedemptions: JSONSchema6["dependencies"] = expression.evaluate(
  rewardInput
);
rewardInput.dependencies = dependenciesWithRedemptions;

const referralImport: JSONSchema6 = {
  $schema: "http://json-schema.org/draft-06/schema#",
  type: "object",
  properties: {
    referral: {
      type: "object",
      title: "Referred By Referral",
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
      required: ["programId", "referrerUser", "referredUser"]
    }
  },
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
        }
      }
    }
  }
};

export default referralImport;
