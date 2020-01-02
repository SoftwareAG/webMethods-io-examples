module.exports = {

  name: "getlocationnearbystops",

  title: "getLocationNearbyStops",

  description: "",
  version: "v1",

  input: {
    title: "Location Name",
    type: "object",
    properties: {
      search: {
        title: 'Search Parameters',
        type: 'object',
        properties: {
          type: {
            title: 'Location Type',
            type: 'string',
            description: 'Select a search type, (S)tation, (P)OI, (SP) Station and POI',
            enum: ['S', 'P', 'SP'],
          },
          originCoordLong: {
            title: 'Search coordinate, longitude',
            description: 'Select a longitude, between -180-180 (WGS84)',
            type: 'string',
          },
          originCoordLat: {
            title: 'Search coordinate, latitude',
            description: 'Select a latitute, between -90-90 (WGS84)',
            type: 'string',
          },
          r: {
            title: 'Search radius',
            description: 'Select a search radius, between 1-10000 (meter)',
            type: 'integer',
            minimum: 1,
            maximum: 10000,
          },
          maxNo: {
            title: 'Maximum returned results',
            description: 'Select a maximum of returned results, between 1 and 1000',
            type: 'integer',
            minimum: 1,
            maximum: 1000,
          },
          format: {
            title: 'Format of output',
            type: 'string',
            enum: ['json', 'xml'],
          },
        },
        required: ['originCoordLat', 'originCoordLong'],
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
    let myActionService = 'location.nearbystops';



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
