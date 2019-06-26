### **Broadcast the Salesforce Lead info in Slack Channel.**

This example shows how to integrate Salesforce and Slack in webmethods.io. As soon as the Leads created in Salesforce an message is broadcast ed in slack about the lead information.

### **Prerequisite**
You should have access to the salesforce and slack SaaS application. 

### **Setup**

1. Go ahead and get started creating a blank workflow. If you need a refresher on how to get to this point, this guide can be a great introduction. Your starting point should resemble ![this](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/salesforceleads-slack/Creating_First_Workflow.png)

2. The trigger is being added by modifying the start button, which is the entry point to the new workflow. Select the gear on top of the start icon to access settings. Once settings is selected in the start icon, a 'trigger' dialog will appear that allows Salesforce trigger to be selected. ![trigger](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/salesforceleads-slack/SalesforcePollingTrigger.png)

3.  Now login to Salesforce on the same browser so that the webmethods.io automatically creates the connection with salesforce.  ![SalesforceLogin](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/salesforceleads-slack/SalesforceLogin.png)

4.  Then try to create the new connection on the Salesforce new trigger which we added. Automatically the login details are picked up by salesforce and a connection is established to salesforce. If required you can edit the connection name created![PollingTrigger](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/salesforceleads-slack/SalesforcePollingTrigger.png)

5. Select done once presented with the final dialog. You should now see the start arrow dialog replaced with a salesforce new lead polling trigger.

6. Now the flow is ready to process, once the salesforce trigger receives the request. In the search dialog lookup "Slack" service and select "Slack" service, drag and drop it into the flow canvas.![SlackService](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/salesforceleads-slack/AddSlackService.png)

Once you drag and drop any service, automatically it connects the salesforce trigger to slack service.

7. Mouse over the slack service and select the setting button then a window pop up asking for the action need to be selected and also the connection needs to be established to your slack channel.![SlackConnection](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/salesforceleads-slack/SlackConnectionAndAction.png)

You can establish the connection in 2 ways

  a)  You can login to slack on the same browser and select the default authorization so that webMethods.io generates the keys for you.
  b)  You can manually enter the keys by selcting the other option.
  ![SlackAuthentication](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/salesforceleads-slack/SlackAuthentication.png)
  
8.  After the connection click next to do the mapping. Map the relevant data required to send to slack channel. Once mapping is done then click on save.![SalesforceLeadToSlackMapping](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/salesforceleads-slack/SalesforceLeadToSlackMapping.png)

9.  Now add the logger function to see the input and the output document to this service.![AddingLogger](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/salesforceleads-slack/AddingLogger.png)

Under logger mapping we have logged both salesforce lead information and also the slack channel information.![LoggingMapper](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/salesforceleads-slack/LoggingMapper.png)

10. Now join the flow to end and this completes the complete workflow. This is ready for testing.![CompleteWorkflow](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/salesforceleads-slack/CompleteWorkflow.png)

11. Test the work flow by either creating a new lead in the salesforce or by just testing the individual step.![TestingWorkflow](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/salesforceleads-slack/TestingWorkflow.png)

12. review the slack channel whether the lead information has been posted.![SlackChannelOutput](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/salesforceleads-slack/SlackChannelOutput.png)
