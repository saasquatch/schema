import {isValidForSchema} from '../helpers/Validator';

describe("HtmlWidget", ()=>{
    isValidForSchema("../json/HtmlWidget.schema.json", "htmlwidget/valid-vanilla");
})