import { JSONSchema6 } from "json-schema";

import AfterUserEventProcessedTriggerContext from "../AfterUserEventProcessedTriggerContext.schema";
import Referrer from "./Referrer.schema";

const afterUserEventProcessedTriggerContextSchema: JSONSchema6 = {
  ...AfterUserEventProcessedTriggerContext,
  properties: {
    ...AfterUserEventProcessedTriggerContext.properties,
    // Adds Referrer for referral programs
    ...Referrer
  }
};

export default afterUserEventProcessedTriggerContextSchema;
