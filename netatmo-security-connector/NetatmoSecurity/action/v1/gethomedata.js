module.exports = {

  name: "gethomedata",

  title: "Gethomedata",

  description: "",
  version: "v1",

  input:{
    title: "Gethomedata",
    type: "object",
    properties: {
		home_id :{
			title: "home_id",
			displayTitle: "Home ID",
			type: "string"
		}
	}
  },

  output: {
    title: "output",
  	type: "object",
  	displayTitle: "Output", 
	properties: {
			
	}
  },

  mock_input:{},

  execute: function(input, output){
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, { 'notice' : 'successful'})
    // your code here
    // output(null, { data : "OK"});
	var request = require("request");	
	
    var options = {
      "method": "get",
      "url": "https://api.netatmo.com/api/gethomedata",
      "headers": {
          "Accept": "application/json",
          "Authorization": "Bearer " + input.auth.access_token
      }
    }
    request(options, function(err, response, body) {
        if (err) {
            return output(err);
        }
        try {
            if (body && typeof(body) === "string") {
                body = JSON.parse(body);
            }
        } catch (e) {
            return output(body);
        };
        if (response.statusCode === 401) {
            return output("Invalid access token");
        }
        if (response.statusCode !== 200) {
            return output("Error Details");
        }
        if (response.statusCode === 200) {
            return output(null, body);
        }
        output(body);

    })
	
	
	
  }

}
