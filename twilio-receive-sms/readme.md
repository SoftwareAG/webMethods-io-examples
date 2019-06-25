# Receive Message From Twilio

This example shows how easy it is,  to receive SMS from Twilio using webMethods.io and send it as email to other interested parties. This functionality can be used for receiving alerts, status via SMS and updating other IT systems. It can be used for Lead generation, creating tickets in ServiceNow etc.

## Prerequisite

Twilio account with at least one phone number to receive and send SMS. Account SID and Auth Token from Twilio Account Dashboard.


## Setup

1. Go ahead and get started creating a blank workflow. If you need a refresher on how to get to this point, this [guide](https://docs.webmethods.io/workflow-building-blocks/creating-first-workflow) can be a great introduction. Your starting point should resemble ![this](https://github.com/mangatrai/webmethodsio-examples/blob/master/twilio-receive-sms/Creating_First_Workflow.png)

2. Trigger is created by modifying the start icon, which is is the entrypoint to the new flow. Please select the gear on top of the start icon to access settings. Once settings is selected in the start icon, a 'trigger' dialog will appear that allows Twilio to be selected as Trigger.![trigger](https://github.com/mangatrai/webmethodsio-examples/blob/master/twilio-receive-sms/trigger.png) 

3. Leave Trigger Label Unchanged. Choose "New Message Delivered" Option in Select Trigger Dropdown. 
![Trigger](https://github.com/mangatrai/webmethodsio-examples/blob/master/twilio-receive-sms/twilio.png)

Twilio Trigger offers two different options for Messsage and Calls. Different option can be selected depending on integration requirement.
![Twilio Trigger Option](https://github.com/mangatrai/webmethodsio-examples/blob/master/twilio-receive-sms/twilio-diff-options.png)

In Connect To Twilio, Select if there is any existing Twilio Account available or click on + button to add a new one.   ![Twilio Authorization](https://github.com/mangatrai/webmethodsio-examples/blob/master/twilio-receive-sms/twilio-auth.png) 

4. Select done once presented with the final dialog. You should now see the start arrow dialog replaced with the Twilio icon. 


5. Now the flow is ready to process, once the Trigger receives the request. In the search dialog lookup "Email" service and select "Send an Email" service under Notification, drag and drop it into the flow canvas. ![Email Step](https://github.com/mangatrai/webmethodsio-examples/blob/master/twilio-receive-sms/email-canvas.PNG)

6. Connect the arrows from Twilio Trigger to the email icon and then to the end icon. This inserts the 'Send an Email' step in the flow. 

7. Configure the "Send an Email" step by clicking the gear icon in the step. Fill in To\CC for email, Drag an drop fields needed from Twilio trigger (left hand side) to email fields on right hand side. ![Email Mapping](https://github.com/mangatrai/webmethodsio-examples/blob/master/twilio-receive-sms/email-map.PNG).


8. Click Next and complete the form. The resulting flow will look like as below. ![finalflow](https://github.com/mangatrai/webmethodsio-examples/blob/master/twilio-receive-sms/Complete-Integration.PNG)The flow is now ready for testng in the webMethods.io UI

9. The flow is now ready to test. Send an SMS from your twilio phone number or Click Test in webMethods.io workflow UI. an email resembling below will be received. ![Email Received](https://github.com/mangatrai/webmethodsio-examples/blob/master/twilio-receive-sms/email-received.PNG)
