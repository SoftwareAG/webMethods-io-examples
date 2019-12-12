/*
* Copyright � 2010 - 2013 Apama Ltd.
* Copyright � 2013 - 2016 Software AG, Darmstadt, Germany and/or its licensors
*
* SPDX-License-Identifier: Apache-2.0
*
*   Licensed under the Apache License, Version 2.0 (the "License");
*   you may not use this file except in compliance with the License.
*   You may obtain a copy of the License at
*
*       http://www.apache.org/licenses/LICENSE-2.0
*
*   Unless required by applicable law or agreed to in writing, software
*   distributed under the License is distributed on an "AS IS" BASIS,
*   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*   See the License for the specific language governing permissions and
*   limitations under the License.
*
*/
module.exports = {

  name: "createcase",

  title: "Createcase",

  description: "",
  version: "v1",

  input:{
    title: "Createcase",
    type: "object",
    properties: {
      caseobject: {
        title: 'Object', // displayed as field label
        type: 'string',
        description: 'Object',
        minLength: 1 // define as reqiured
      },
      casedata: {
        title: 'Data',
        type: 'array',
        description: 'Data',
        items: {
            title : 'Key-Value pairs',
            type: 'object',
            description: 'Key-Values',
            properties: {
              casekey:  {
                title: 'Key', // displayed as field label
                type: 'string',
                description: 'Key',
                minLength: 1 // define as reqiured
              },
              casevalue:  {
                title: 'Value', // displayed as field label
                type: 'string',
                description: 'Value',
                minLength: 1 // define as reqiured
              }
            }
         }
      }
    }
  },

  output: {
    title: "output",
  	type: "object",
  	properties: {

    }
  },

  mock_input:{caseobject:'Anwohnerparkausweis', casedata:[ {casekey:'field_id', casevalue:'123'},{casekey:'rolle', casevalue:'test'} ] },

  
  execute: function(input, output){
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, { 'notice' : 'successful'})
    // your code here
    const request = require('request');
    var loginxml = "<platform> <login>" + "<userName>"+input.auth.username+"</userName>" + "<password>"+input.auth.password+"</password>" + "</login>" + "</platform>";
    var cookie = "test"

    
    request.post({
        url: "https://<your tenant>.agileappscloud.eu/networking/rest/login",
        port:443,
        method:"POST",
        headers:{
          'Content-Type' : 'application/xml'
        }, 
        body: loginxml
   }, 
   function (error, res, body) {
      if (error) {
        output(null,error)
        return
      }
            
      let response= JSON.parse(body);
      cookie = response.platform.login.cookieString;
      
      var addrecordxml = "<platform> <record>";
      input.casedata.forEach(element => {
        addrecordxml+= "<" + element.casekey +">" + element.casevalue +"</" + element.casekey +">"
      });
      addrecordxml = addrecordxml + "</record></platform>";
 
      request.post({
        url: "https://<your tenant>.agileappscloud.eu/networking/rest/record/" + input.caseobject,
        port: 443,
        method: "POST",
        headers: {
          'Content-Type' : 'application/xml',
          'Cookie' : cookie
        }, 
        body: addrecordxml
      }, 
      function (error, res, body) {
        if (error) {
          output(null,error)
          return
        }
        output(null,body)
      })
    })
  }
}
