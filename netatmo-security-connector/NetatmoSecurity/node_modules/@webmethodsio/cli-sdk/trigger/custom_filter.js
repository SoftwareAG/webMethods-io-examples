
var _ = require('lodash')
var CustomFilters = { }

module.exports = CustomFilters

CustomFilters.schema = {
    "type" : "array",
    "title" : "Custom Filters",
    "items" : {
        "type" : "object",
        "title" : "filter",
        "properties" : {
            "input" : {
                "type" : "string",
                "title" : "Input",
                "minLength"  :1
            },
            "operator" : {
                "type" : "string",
                "title" : "Condition",
                "minLength":1,
                "description" : "Select proper condition",
                "enum" : [
                    "(Text) Matches",
                    "(Text) Exactly Matches",
                    "(Text) Does Not Match",
                    "(Text) Does Not Exactly Match",
                    "(Text) Contains",
                    "(Text) Does Not Contain",
                    "(Text) Starts With",
                    "(Text) Does Not Start With",
                    "(Text) Ends With",
                    "(Text) Does Not End With",
                    "(Text) Is Alphanumeric",
                    "(Text) Is Empty",
                    "(Number) Equals",
                    "(Number) Not Equals",
                    "(Number) Greater Than",
                    "(Number) Greater Than Equals",
                    "(Number) Less Than",
                    "(Number) Less Than Equals",
                    "(Number) Is Negative",
                    "(Number) Is Positive",
                    "(Date/Time) Equals",
                    "(Date/Time) Less Than",
                    "(Date/Time) Less Than Equals",
                    "(Date/Time) Greater Than",
                    "(Date/Time) Greater Than Equals",
                    "(Array) Length Equals",
                    "(Array) Length Does Not Equals",
                    "(Array) Length Less Than",
                    "(Array) Length Less Than Equals",
                    "(Array) Length Greater Than",
                    "(Array) Length Greater Than Equals",
                    "(Array) Is Empty",
                    "(Array) Contains All Object",
                    "(Array) Contains All String",
                    "(Array) Contains All Number",
                    "(Array) Contains All Object And Has This Property",
                    "(Object) Has Property",
                    "(Object) Does Not Have Property",
                    "(Object) Is Empty",
                    "(Regex) Match Pattern",
                    "(Boolean) Is True",
                    "(Boolean) Is False",
                    "(Input) Exists",
                    "(Input) Does Not Exist",
                    "(Input) Is Null",
                    "(Input) Is Undefined",
                    "(Input) Is String",
                    "(Input) Is Number",
                    "(Input) Is Date",
                    "(Input) Is An Array",
                    "(Input) Is An Object",
                    "(Input) Is Boolean",
                    "(Input) Data Type Is"
                ]
            },
            "expected": {
                "type": "string",
                "title": "Expected",
                "minLength":1,
                "description" : "Value you are expecting, default value is true in case of condition start with Is"
            }
        }
    }
}

CustomFilters.filter = filter

CustomFilters.interpolate = interpolate

CustomFilters.dataType = dataType

function filter(filters, data, output){
    var customFilters = [ ];
    if(filters && Array.isArray(filters)){
        customFilters = filters.filter(function(item){
            if(item.input && item.input.trim()){
                return true;
            }
        });
    }
    if(!customFilters.length){
        return output(null, data);
    }
    data = Array.isArray(data) ? data : [ data ];
    var matched = data.filter(function(item){
        return customFilters.every(function(matcher){
            var condition = matcher.operator || matcher.condition;
            var context         = clone(item);
            context.$params     = item;
            context.$trigger    = item;
            return testCondition(interpolate(matcher.input, context), condition, matcher.expected);
        });
    });
    
    if(matched.length){
        return output(null, matched);
    }
    return output(null);
}

function interpolate(input, context){
    if(!input ||
        typeof(input) === "function" ||
        typeof(input.on) === "function"){
        return input;
    }if(Array.isArray(input)){
        input.forEach(function(item, index){
            input[index] = interpolate(item, context, index);
        });
    }if(typeof(input) === "object"){
        Object.keys(input).forEach(function(item){
            input[item] = interpolate(input[item], context, item);
        });
    }else if(typeof(input) === "string"){
        input = input.trim();
        var parameters = input.match(/{{([^{}]+)}}/g);
        if(parameters && parameters.length){
            var contents = parameters.map(function(itemd){
                itemd = String(itemd).replace(/{{|}}/g, '').trim();
                return _.get(context, itemd, '');
            });
            try{
                if(parameters[0].trim() === input.trim()){
                    return contents[0];
                }
                parameters.forEach(function(paramItem, index){
                    var thisContent = contents[index];
                    if(typeof(thisContent) !== "string"){
                      thisContent = JSON.stringify(thisContent);
                    }
                    input = String(input).replace(paramItem, thisContent);
                });
                if(input && typeof(input) === "string" && input.match(/{{([^{}]+)}}/g)){
                    return interpolate(input, context);
                }
                return input;
            }catch(e){
            }
        }
    }
    return input;
}

function testCondition(input, condition, expected){
    try{
        switch(condition){
            case "(Text) Exactly Matches" :
                return String(input) === String(expected);

            case "(Text) Matches" :
                return String(input).toLowerCase().trim() === String(expected).toLowerCase().trim();

            case "(Text) Does Not Exactly Match" :
                return String(input) !== String(expected);

            case "(Text) Does Not Match":
                return String(input).toLowerCase() !== String(expected).toLowerCase();

            case "(Text) Contains":
                return String(input).indexOf(String(expected)) >= 0;

            case "(Text) Does Not Contain":
                return String(input).indexOf(String(expected)) === -1;

            case "(Text) Starts With":
                return String(input).indexOf(String(expected)) === 0;

            case "(Text) Does Not Start With":
                return String(input).indexOf(String(expected)) !== 0;

            case "(Text) Ends With":
                return String(input).substr(-String(expected).length) === String(expected);

            case "(Text) Does Not End With" :
                return String(input).substr(-String(expected).length) !== String(expected);

            case "(Text) Is Alphanumeric":
                if(typeof(input) !== "string" && typeof(input) !== "number"){
                    return false;
                }
                var exp2 = (String(expected).toLowerCase().trim() !== "false");
                return alphaNumeric.test(String(input)) === exp2;

            case "(Text) Is Empty":
                var exp3 = (String(expected).toLowerCase().trim() !== "false");
                return ((String(input).trim() == "") === exp3);

            case "(Number) Equals":
                return Number(input) === Number(expected);

            case "(Number) Not Equals":
                return Number(input) !== Number(expected);

            case "(Number) Greater Than":
                return Number(input) > Number(expected);

            case "(Number) Greater Than Equals":
                return Number(input) >= Number(expected);

            case "(Number) Less Than":
                return Number(input) < Number(expected);

            case "(Number) Less Than Equals":
                return Number(input) <= Number(expected);

            case "(Number) Is Negative":
                var exp4 = (String(expected).toLowerCase().trim() !== "false");
                return (!isNaN(input) && (Number(input) < 0) === exp4);

            case "(Number) Is Positive":
                var exp5 = (String(expected).toLowerCase().trim() !== "false");
                return (!isNaN(input) && (Number(input) >= 0) === exp5);

            case "(Date/Time) Equals":
                if(new Date(input) == "Invalid Date"){
                    throw Error('input should be a date');
                }
                if(new Date(expected) == "Invalid Date"){
                    throw Error('expected should be a date');
                }
                return ((new Date(input)).getTime() === (new Date(expected)).getTime());

            case "(Date/Time) Less Than":
                if(new Date(input) == "Invalid Date"){
                    throw Error('input should be a date');
                }
                if(new Date(expected) == "Invalid Date"){
                    throw Error('expected should be a date');
                }
                return ((new Date(input)).getTime() < (new Date(expected)).getTime());

            case "(Date/Time) Less Than Equals":
                if(new Date(input) == "Invalid Date"){
                    throw Error('input should be a date');
                }
                if(new Date(expected) == "Invalid Date"){
                    throw Error('expected should be a date');
                }
                return ((new Date(input)).getTime() <= (new Date(expected)).getTime());

            case "(Date/Time) Greater Than":
                if(new Date(input) == "Invalid Date"){
                    throw Error('input should be a date');
                }
                if(new Date(expected) == "Invalid Date"){
                    throw Error('expected should be a date');
                }
                return ((new Date(input)).getTime() > (new Date(expected)).getTime());

            case "(Date/Time) Greater Than Equals":
                if(new Date(input) == "Invalid Date"){
                    throw Error('input should be a date');
                }
                if(new Date(expected) == "Invalid Date"){
                    throw Error('expected should be a date');
                }
                return ((new Date(input)).getTime() >= (new Date(expected)).getTime());

            case "(Date/Time) Is Valid Date":
                if(new Date(input) == "Invalid Date"){
                    throw Error('input should be a date');
                }
                var exp6 = (String(expected).toLowerCase().trim() !== "false");
                return (((new Date(input)) != 'Invalid Date') === exp6);

            case "(Array) Length Equals":
                if(!Array.isArray(input)){
                    throw Error('input should be an array');
                }
                return input.length === Number(expected);

            case "(Array) Length Does Not Equals":
                if(!Array.isArray(input)){
                    throw Error('input should be an array');
                }
                return input.length !== Number(expected);

            case "(Array) Length Greater Than":
                if(!Array.isArray(input)){
                    throw Error('input should be an array');
                }
                return input.length > Number(expected);

            case "(Array) Length Less Than":
                if(!Array.isArray(input)){
                    throw Error('input should be an array');
                }
                return input.length < Number(expected);

            case "(Array) Length Greater Than Equals":
                if(!Array.isArray(input)){
                    throw Error('input should be an array');
                }
                return input.length >= Number(expected);

            case "(Array) Length Less Than Equals":
                if(!Array.isArray(input)){
                    throw Error('input should be an array');
                }
                return input.length <= Number(expected);

            case "(Array) Is Empty":
                if(!Array.isArray(input)){
                    throw Error('input should be an array');
                }
                var exp23 = (String(expected).toLowerCase().trim() !== "false");
                return ((!input.length) === exp23);

            case "(Array) Contains All Object":
                if(!Array.isArray(input)){
                    throw Error('input should be an array');
                }
                var exp20 = (String(expected).toLowerCase().trim() !== "false");
                var result =  input.every(function(item){
                    return (dataType(item) === "Object");
                });

                return (result === exp20);

            case "(Array) Contains All String":
                if(!Array.isArray(input)){
                    throw Error('input should be an array');
                }
                var exp21 = (String(expected).toLowerCase().trim() !== "false");
                var result2 =  input.every(function(item){
                    return (dataType(item) === "String") ;
                });

                return (result2 === exp21);

            case "(Array) Contains All Number":
                if(!Array.isArray(input)){
                    throw Error('input should be an array');
                }
                var exp22 = (String(expected).toLowerCase().trim() !== "false");
                var result3 =  input.every(function(item){
                    return (dataType(item) === "Number");
                });

                return (result3 === exp22);

            case "(Array) Contains All Object And Has This Property":
                if(!Array.isArray(input)){
                    throw Error('input should be an array');
                }
                expected = String(expected).trim();
                if(!String(expected).trim()){
                    return false;
                }
                return input.every(function(item){
                    if(item && typeof(item) === 'object' && Object(item).hasOwnProperty(expected)){
                        return true;
                    }
                });

            case "(Object) Has Property":
                if(dataType(input) !== "Object"){
                    throw Error('input should be an object');
                }
                return (input && expected && (typeof(input) === "object") && (typeof(input.hasOwnProperty) === "function") && input.hasOwnProperty(expected));

            case "(Object) Does Not Have Property":
                if(dataType(input) !== "Object"){
                    throw Error('input should be an object');
                }
                return (input && expected && (typeof(input) === "object") && (typeof(input.hasOwnProperty) === "function") && !input.hasOwnProperty(expected));

            case "(Object) Is Empty":
                if(dataType(input) !== "Object"){
                    throw Error('input should be an object');
                }
                var exp23 = (String(expected).toLowerCase().trim() !== "false");
                return (_.isEmpty(input) === exp23);

            case "(Regex) Match Pattern":
                expected = String(expected);
                if(expected.match(/^\/[^\/]+\/?[i|g|m]+$/)){
                    var regContent = expected.substr(1, expected.lastIndexOf("/") -1);
                    var modifier = expected.substr(expected.lastIndexOf("/") + 1, expected.length);
                    var regEx = RegExp(regContent, modifier);
                    return regEx.test(input);
                }else{
                    var regExx = RegExp(expected);
                    return regExx.test(input);
                }

            case "(Boolean) Is True":
            case "(Boolean) Is Value True":
                if(typeof(input) !== "boolean"){
                    throw Error('input should be a boolean');
                }
                var exp7 = (String(expected).toLowerCase().trim() !== "false");
                return (input === exp7);

            case "(Boolean) Is False":
            case "(Boolean) Is Value False":
                if(typeof(input) !== "boolean"){
                    throw Error('input should be a boolean');
                }
                var exp8 = (String(expected).toLowerCase().trim() !== "false");
                return (input !== exp8);

            case "(Input) Exists":
                var exp9 = (String(expected).toLowerCase().trim() !== "false");
                var typ1 = (dataType(input) !== "Undefined");
                return (typ1 && typ1 === exp9);

            case "(Input) Does Not Exist":
                var exp10 = (String(expected).toLowerCase().trim() !== "false");
                var typ2 = (dataType(input) === "Undefined" || input === "undefined");
                return (typ2 === exp10);

            case "(Input) Is Null":
                var exp11 = (String(expected).toLowerCase().trim() !== "false");
                return ((dataType(input) === "Null") === exp11);

            case "(Input) Is Undefined":
                var exp12 = (String(expected).toLowerCase().trim() !== "false");
                return ((dataType(input) === "Undefined") === exp12);

            case "(Input) Is String":
                var exp13 = (String(expected).toLowerCase().trim() !== "false");
                return ((dataType(input) === "String") === exp13);

            case "(Input) Is Number":
                var exp14 = (String(expected).toLowerCase().trim() !== "false");
                return ((dataType(input) === "Number") === exp14);

            case "(Input) Is Date":
                var exp15 = (String(expected).toLowerCase().trim() !== "false");
                return ((String(new Date(input)) !== 'Invalid Date') === exp15);

            case "(Input) Is An Array":
                var exp16 = (String(expected).toLowerCase().trim() !== "false");
                return ((dataType(input) === 'Array') === exp16);

            case "(Input) Is An Object":
                var exp17 = (String(expected).toLowerCase().trim() !== "false");
                return ((dataType(input) === 'Object') === exp17);

            case "(Input) Is Boolean":
                var exp18 = (String(expected).toLowerCase().trim() !== "false");
                return ((dataType(input) === 'Boolean') === exp18);

            case "(Input) Data Type Is":
                return dataType(input).toLowerCase() === String(expected).toLowerCase();

            default:
                return false;
        }
    }catch(e){
        return false;
    }
}

function clone(obj){
    if(obj && typeof(obj) === "object"){
        if(Array.isArray(obj)){
            return obj.slice(0);
        }else{
            var ret = { };
            Object.keys(obj).forEach(function(item){
                ret[item] = obj[item];
            });
            return ret;
        }
    }
    return obj;
}

function dataType(obj){
    try{
        if(typeof(obj) === 'undefined'){
            return 'Undefined';
        }else if(obj === null){
            return 'Null';
        }
        var text = Function.prototype.toString.call(obj.constructor);
        return text.match(/function (.*)\(/)[1];
    }catch(e){
        return typeof(obj);
    }
}