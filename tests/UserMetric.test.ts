import {isValidForSchema} from '../helpers/Validator';

describe("UserMetric", ()=>{
    isValidForSchema("../json/UserMetric.schema.json", "usermetric/VIPMetric");
})