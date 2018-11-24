import {isValidForSchema} from '../helpers/Validator';

describe("HtmlWidget", ()=>{
    isValidForSchema("../json/ProgramTransaction.schema.json", "ProgramTransaction");
})