import {isValidForSchema} from '../helpers/Validator';

describe("UserMetric", ()=>{
    isValidForSchema("../json/UserMetric.schema.json", "usermetric/PartnersFirstPurchase", "usermetric/VIPMetricCurrency", "usermetric/VIPMetricNoCurrency");
})