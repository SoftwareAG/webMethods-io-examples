module.exports = {

  name: "getstationboard",

  title: "getStationboard",

  description: "",
  version: "v1",

  input: {
    title: "Staionboard",
    type: "object",
    properties: {
      search: {
        title: 'Search Parameters',
        type: 'object',
        properties: {
          extId: {
            title: 'Location Id',
            type: 'string',
            description: 'Select a Station by Id for departure Stationboard',
          },
          rtMode: {
            title: 'Realtime mode',
            type: 'string',
            description: 'Select a mode to get realtime information',
            enum: ['FULL', 'OFF', 'INFOS', 'REALTIME', 'SERVER_DEFAULT'],
          },
          maxJourneys: {
            title: 'Maximum returned results',
            description: 'Select a maximum of returned results',
            type: 'integer',
          },
          format: {
            title: 'Format of output',
            type: 'string',
            enum: ['json', 'xml'],
          },
        },
        required: ['extId'],
      }
    }
  },


  output: {
    title: "output",
    type: "object",
    properties: {

    }
  },

  mock_input: {},

  execute: function (input, output) {
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, { 'notice' : 'successful'})
    // your code here
    const path = require('path');
    const url = require('url');
    const querystring = require('querystring');

    let settings = require('../../settings.json');
    let myActionService = 'departureboard';



    let queryString = querystring.stringify({ ...{ 'accessId': input.auth.api_key }, ...input.search });
    //console.log("input.auth.api_key: ", input.auth.api_key);
    //console.log("queryString: ", queryString);

    //const myURL = url.parse('https://example.org:8080/a/b/c?a=5');
    const myURL = url.format({
      protocol: settings.protocol,
      hostname: settings.baseUrl,
      pathname: path.posix.join(settings.path, myActionService),
      search: queryString,
    });

    let options = {
      "method": "GET",
      "url": myURL,
    }

    let request = require("request");


    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      output(null, body);
    });

  }
}
