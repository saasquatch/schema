import {isValidForSchema} from '../helpers/Validator';

describe("HtmlWidget", ()=>{
    isValidForSchema("HtmlWidget.schema.json", "htmlwidget/valid-vanilla");
})