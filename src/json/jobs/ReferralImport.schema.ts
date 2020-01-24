import { JSONSchema6 } from "json-schema";
import mergeJson from "merge-json";
import rewardApiInput from "../RewardApiInput.schema.json";
import userIdentifier from "../UserIdentifier.schema.json";

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
      }
    }
  },
  definitions: {
    ...(<JSONSchema6>rewardApiInput).definitions,
    rewards: {
      type: "array",
      title: "Rewards",
      items: {
        ...mergeJson.merge((<JSONSchema6>rewardApiInput).properties, {
          type: "object",
          properties: {
            programRewardKey: {
              type: "string",
              title: "Reward Key"
            },
            dateGiven: {
              type: "integer",
              title: "Date Given"
            },
            redemptions: {
              $ref: "#/definitions/redemptions"
            }
          }
        })
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
