import {isValidForSchema} from '../helpers/Validator';
 
describe("UserTokenClaims", ()=>{
    isValidForSchema("UserTokenClaims.schema.json", "UserReadToken-v1", "UserUnauthedToken-v2", "UserWriteToken-v1");
})