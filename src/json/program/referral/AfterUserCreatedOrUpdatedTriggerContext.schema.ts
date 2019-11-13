import { JSONSchema6 } from "json-schema";

import AfterUserCreatedOrUpdatedTriggerContext from "../AfterUserCreatedOrUpdatedTriggerContext.schema";
import Referrer from "./Referrer.schema";

const afterUserCreatedOrUpdatedTriggerContextSchema: JSONSchema6 = {
  ...AfterUserCreatedOrUpdatedTriggerContext,
  properties: {
    ...AfterUserCreatedOrUpdatedTriggerContext.properties,
    // Adds Referrer for referral programs
    ...Referrer
  }
};

export default afterUserCreatedOrUpdatedTriggerContextSchema;
