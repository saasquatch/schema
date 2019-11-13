import { JSONSchema6 } from "json-schema";

import { baseUserContextFields } from "../ProgramTriggerSchemaComponents";

// Re-used across referral trigger types
const Referrer:JSONSchema6["properties"] = {
  referrer:{
    title: "Referrer",
    properties: {
      ...baseUserContextFields
    }  
  }
};

export default Referrer;
