# webMethods.io Integration Connector for AgileApps

This example shows how to create a generic webmethods.io connector to create data records in AgileApps. The AgileApps Cloud platform is a business process and application platform that lets you create process-driven, situational, case management applications in a very short time.  

## Prerequisite

1. To test the AgileApps Connector you should have a AgileApps tenant. You can request a 30-days free-trial on https://www.softwareag.cloud/site/product/webmethods-agile-apps.html#/

2. NVM v8.14.0

3. wM.io Connector Builder CL (by running the command "npm i @webmethodsio/wmiocli -g") 



## Setup

1. Before you can start with the webMethods.io Connector Builder, you must first 

    • Switch to Node.js v8.14.0

    • Make sure that Connector Builder is installed globally under Node.js v8.14.0

    • Login to the webMethods.io Integration tenant

2. Establish connection to your tenant from the connector builder.
    • You need your "Developer key" on your webMethods.io tenant - You find it on your avatar/Settings.
    • In your visual code terminal do

    > nvm use 8.14.0

    > wmio -v

    > wmio login #Enter the required parameters like your tenant, email and developer key. 

    > wmio init #Enter the name of your connector

3. Install all needed libraries for your new connector app. To do so, run the following command in the Terminal view:
    > npm install

4. Create a new Action named "createcase" by running the following command 
    > wmio create action createcase

5. Implement the "createcase" action using the createcase.js sample

    • You find the new action "createcase" in /action/v1

    • Replace the source with the createcase.js file of this sample

6. Deploy the connector to your webMethods.io tenant

    • In your Terminal view enter the following command:
    > wmio deploy


## Test your new "createcase" connector

1. In a browser, log into your tenant and open webMethods.io integration

2. Open a project 

3. Create a new workflow

4. Find the new created connector in the Connectors Panel by entering the name in the search field

5. Drag the new Connector to your canvas and connect it with the start and end nodes.

6. Open the action settings by clicking on the gear icon of the action node. On the first step, an account for the connector must be configured. Click on the "+" icon to do so. Entwer your userame and password of the agileapps tenant. Click "next"

7. Provide the input values for the action

    • Set the "object" name to name of the agileapps object on which you would like to add a new record.

    • Add one or more attributes to the object by adding key-value-pairs to the object. The "key" has to be one of the field-name of the agileapps object. When you are done click "next".

8. In the last step of the action configuration, you can test your action by clicking on the "Test" button.

9. As a result you should see the response from agileapps which contains the record-Id of the newly created record. You can also check in agileapps if the record was created successful.


