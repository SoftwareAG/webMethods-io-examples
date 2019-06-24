var request = require('request');

module.exports = function(){
    this.id = "dropbox-folders-get";

    this.label = "Get Folders Details";

    this.input ={
        "title": "Get Folder Details",
        "type": "object",
        "properties": {
            "accessToken": {
                "title": "Authorize Dropbox",
                "type": "string",
                "oauth": "dropboxv2",
                "minLength": 1,
                "propertyOrder": 1
            },
            "path": {
                "type": "string",
                "title": " Folder Path",
                "description": "Select the path to the folder you wish to retrieve details of",
                "minLength": 1,
                "propertyOrder": 2,
                "lookup": {
                    "service": "dropbox",
                    "auth": "oauth",
                    "id": "d6",
                    "enabled": true,
                    "searchable": false,
                    "dependencies": [
                        "accessToken"
                    ]
                }
            },
            "recursive": {
                "type": "string",
                "title": "Is Recursive",
                "description": "If set to true, the result will include contents of all the subfolders of a specific folder that you wish to retrieve",
                "propertyOrder": 3,
                "enum": [
                    "True",
                    "False"
                ],
                "default": "False"
            },
            "include_media_info": {
                "type": "string",
                "title": "Include File Metadata",
                "description": "Specify true if you wish to include video and photo in your result, else specify false",
                "propertyOrder": 4,
                "enum": [
                    "True",
                    "False"
                ],
                "default": "False"
            },
            "include_deleted": {
                "type": "string",
                "title": "Include Deleted",
                "description": "Specify true if you wish to include deleted files in the result, else specify false",
                "propertyOrder": 5,
                "enum": [
                    "True",
                    "False"
                ],
                "default": "False"
            },
            "include_has_explicit_shared_members": {
                "type": "string",
                "title": "Include Explicit Shared Members",
                "description": "Specify true if you wish to include explicit members in your result, else specify false",
                "propertyOrder": 6,
                "enum": [
                    "True",
                    "False"
                ],
                "default": "False"
            }
        }
    };

    this.help = "This activity get folder's files from dropbox account storage";

    this.output ={
        "title": "output",
        "type": "object",
        "properties": {
            "cursor": {
                "type": "string",
                "title": "cursor"
            },
            "entries": {
                "type": "array",
                "title": "entries",
                "displayTitle": "Files in Folder",
                "items": {
                    "title": "items",
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "string",
                            "title": "id",
                            "displayTitle": "Folder ID"
                        },
                        "name": {
                            "type": "string",
                            "title": "name",
                            "displayTitle": "Folder Name"
                        },
                        "path_display": {
                            "type": "string",
                            "title": "path_display",
                            "displayTitle": "Folder Path"
                        },
                        "client_modified": {
                            "type": "string",
                            "title": "client_modified",
                            "displayTitle": "Modified Date on Client"
                        },
                        "server_modified": {
                            "type": "string",
                            "title": "server_modified",
                            "displayTitle": "Modified date on Server"
                        },
                        "path_lower": {
                            "type": "string",
                            "title": "path_lower"
                        },
                        "size": {
                            "type": "number",
                            "title": "size",
                            "displayTitle": "Folder Size"
                        }
                    }
                }
            },
            "has_more": {
                "type": "string",
                "title": "has_more",
                "displayTitle": "Has More Entries"
            }
        }
    };

    this.execute = function(input,output){
        var obj ={"True": true, "False": false};

        if(input.path === "/"){
            input.path = "";
        }

        var jsonData = {
            "path" : input.path,
            "recursive" : obj[input.recursive],
            "include_media_info" : obj[input.include_media_info],
            "include_deleted" : obj[input.include_deleted],
            "include_has_explicit_shared_members" : obj[input.include_has_explicit_shared_members]
        };


        request({
            method :'POST', 
            headers :{
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "authorization": "Bearer "+ input.accessToken
            },          
            url : 'https://api.dropboxapi.com/2/files/list_folder',
            json: jsonData
        },
        function(err,res,body){
            if(err){
                throw(err)
            }
            if(res && res.statusCode && res.statusCode >= 200 && res.statusCode < 400) {
                if(typeof(body) == 'string'){
                    body = JSON.parse(body);
                }

                return output(null, body);
            }
            return output(body)
        })
    };
};