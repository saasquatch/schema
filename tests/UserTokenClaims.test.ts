import {isValidForSchema} from '../helpers/Validator';

describe("UserTokenClaims", ()=>{
    isValidForSchema("../json/UserTokenClaims.schema.json", "UserReadToken-v1", "UserUnauthedToken-v2", "UserWriteToken-v1");
})