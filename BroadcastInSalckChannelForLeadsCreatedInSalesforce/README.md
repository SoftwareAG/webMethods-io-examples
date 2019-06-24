### **Broadcast the Salesforce Lead info in Slack Channel.**

This example shows how to integrate Salesforce and Slack in webmethods.io. As soon as the Leads created in Salesforce an message is broadcast ed in slack about the lead information.

### **Prerequisite**
You should have access to the salesforce and slack SaaS application. 

### **Setup**

1. Go ahead and get started creating a blank workflow. If you need a refresher on how to get to this point, this guide can be a great introduction. Your starting point should resemble ![this](https://github.com/maam1/webmethodsio-examples/blob/master/BroadcastInSalckChannelForLeadsCreatedInSalesforce/Creating_First_Workflow.png)

2. The trigger is beeing added by modifying the start button, which is the entry point to the new workflow. lease select the gear on top of the start icon to access settings. Once settings is selected in the start icon, a 'trigger' dialog will appear that allows Salesforce trigger to be selected. ![trigger](https://github.com/maam1/webmethodsio-examples/blob/master/BroadcastInSalckChannelForLeadsCreatedInSalesforce/SalesforcePollingTrigger.png)

3.  Now login to Salesforce on the same browser so that the webmethods.io automatically create the connection with salesforce.  ![SalesforceLogin](https://github.com/maam1/webmethodsio-examples/blob/master/BroadcastInSalckChannelForLeadsCreatedInSalesforce/SalesforceLogin.png)

4.  Then try to create the new connection on the Salesforce new trigger which we added. Automatically the login details are picked up by salesforce and a connection is established to salesforce. If reqired you can edit the connection name created![PollingTrigger](https://github.com/maam1/webmethodsio-examples/blob/master/BroadcastInSalckChannelForLeadsCreatedInSalesforce/SalesforcePollingTrigger.png)

5.Select done once presented with the final dialog. You should now see the start arrow dialog replaced with a salesforce new lead polling trigger.

6.Now the flow is ready to process, once the salesforce trigger receives the request. In the search dialog lookup "Slack" service and select "Slack" service, drag and drop it into the flow canvas.![SlackService](https://github.com/maam1/webmethodsio-examples/blob/master/BroadcastInSalckChannelForLeadsCreatedInSalesforce/AddSlackService.png)

Once you drag and drop any service, automatically it connects the salesforce trigger to slack service.

7. Mouse over the slack service and select the setting button then a window pop up adking for the action need to be selected and also the connection needs to be establihed to your slacl channel.![SlackConnection](https://github.com/maam1/webmethodsio-examples/blob/master/BroadcastInSalckChannelForLeadsCreatedInSalesforce/SlackConnectionAndAction.png)

You can establish the connection in 2 ways

  a)  You can login to slack on the same browser and select the default authorization so that webMethods.ip generates the keys for you.
  b)  You can manually enter the keys by secting the other option.
  ![SlackAuthentication](https://github.com/maam1/webmethodsio-examples/blob/master/BroadcastInSalckChannelForLeadsCreatedInSalesforce/SlackAuthentication.png)
  
8.  After the connection click next to do the mapping. Map the relevent data required to send to slack channel. Once mapping is done then click on save.![SalesforceLeadToSlackMapping](https://github.com/maam1/webmethodsio-examples/blob/master/BroadcastInSalckChannelForLeadsCreatedInSalesforce/SalesforceLeadToSlackMapping.png)

9.  Now add the logger function to see the input and the output document to this service.![AddingLogger](https://github.com/maam1/webmethodsio-examples/blob/master/BroadcastInSalckChannelForLeadsCreatedInSalesforce/AddingLogger.png)

Under logger mapping we have logged both salesforce lead information and also the slack channel information.![LoggingMapper](https://github.com/maam1/webmethodsio-examples/blob/master/BroadcastInSalckChannelForLeadsCreatedInSalesforce/LoggingMapper.png)

10. Now join the flow to end and this completes the complete workflow. This is ready for testing.![CompleteWorkflow](https://github.com/maam1/webmethodsio-examples/blob/master/BroadcastInSalckChannelForLeadsCreatedInSalesforce/CompleteWorkflow.png)

11. Test the work flow by either reating a new lead in the salesforce or by just testing the indivisual step.![TestingWorkflow](https://github.com/maam1/webmethodsio-examples/blob/master/BroadcastInSalckChannelForLeadsCreatedInSalesforce/TestingWorkflow.png)

12. review the slack channel whether the lead information has been posted.![SlackChannelOutput](https://github.com/maam1/webmethodsio-examples/blob/master/BroadcastInSalckChannelForLeadsCreatedInSalesforce/SlackChannelOutput.png)


