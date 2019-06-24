webMethods has a rich set of existing functionality.

For example, if you would like to use oauth of particular service which already exist but the required actions doesnt exist then you can use the oauth with following schema

```
"accessToken": {
                "title": "Authorize Dropbox",
                "type": "string",
                "oauth": "dropboxv2",
                "minLength": 1,
                "propertyOrder": 1
 },
```

 You have to provide the oauth name in the oauth Key. you can contact webmethod team to get the oauth list(names).


 Similarly you can also use lookup just you have to get the service name and ID of the lookup. Sample schema for lookup

```
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
```