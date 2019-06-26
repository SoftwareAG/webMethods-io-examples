# Send SMS Using Twilio

This example shows how easy it is, to Send SMS from Twilio using webMethods.io. This functionality can be used for sending alerts, status, marketing offers etc via SMS. 

## Prerequisite

Twilio account with at least one phone number to receive and send SMS. Account SID and Auth Token from Twilio Account Dashboard.


## Setup

1. Go ahead and get started creating a blank workflow. If you need a refresher on how to get to this point, this [guide](https://docs.webmethods.io/workflow-building-blocks/creating-first-workflow) can be a great introduction. Your starting point should resemble ![this](https://github.com/mangatrai/webmethodsio-examples/blob/master/twilio-send-sms/Creating_First_Workflow.png)

2. The Webhook is created by modifying the start icon, which is is the entrypoint to the new flow. Please select the gear on top of the start icon to access settings. Once settings is selected in the start icon, a 'trigger' dialog will appear that allows Webhook to be selected.![trigger](https://github.com/mangatrai/webmethodsio-examples/blob/master/twilio-send-sms/trigger.PNG) 

3. Leave Webhook Authentication unchecked. Check/Enable Webhook Payload, add the structure of the input payload into the "Body" text area and click next. Note the webhook url and save this for later. As a best practice, Authentication should be added immedately after flow ("SendSMSUsingTwilio") is working ![webhook](https://github.com/mangatrai/webmethodsio-examples/blob/master/twilio-send-sms/webhook.PNG)  

![webhookpayload](https://github.com/mangatrai/webmethodsio-examples/blob/master/twilio-send-sms/webhook-payload.PNG) 

4. Select done once presented with the final dialog. You should now see the start arrow dialog replaced with a webhook icon. ![webhookconfigured](https://github.com/mangatrai/webmethodsio-examples/blob/master/twilio-send-sms/webhook-canvas.PNG)


5. Now the flow is ready to process, once the webhook receives the request. In the search dialog lookup "Twilio" service and select "Twilio" service.
![TwilioSearch](https://github.com/mangatrai/webmethodsio-examples/blob/master/twilio-send-sms/twilio-search.PNG)

6. Drag and drop it into the flow canvas. ![TwilioService](https://github.com/mangatrai/webmethodsio-examples/blob/master/twilio-send-sms/twilio-canvas.PNG) Connect the arrows from webhook to the twilio icon and then to the end icon. This inserts the 'Twilio' step in the flow. 

7. Configure the "Twilio" step by clicking the gear icon in the step. Select action as "Send and SMS". Give it a name (ie the step name) as "Send an SMS". Click + icon next to "Connect to Twilio" drop down and configure the account credentials to connect to Twilio instance. ![TwilioAction](https://github.com/mangatrai/webmethodsio-examples/blob/master/twilio-send-sms/twilio-action-configure.PNG). Note - if you had already configured the Twilio credentials, just reuse it by selecting from "Connect to Twilio" drop down.

8. Configure the Twilio credentials. You will use Twilio Account SID and AUTH Token to connect to Twilio in this screen.
![TwilioAuth](https://github.com/mangatrai/webmethodsio-examples/blob/master/twilio-send-sms/twilio-auth.png)
Click Add to close the window and go back to  configure "Twilio "Send an SMS" window. Click "Next" 

9. In the Mapping screen, add the to, from, body from webhook json input. ![TwilioMap](https://github.com/mangatrai/webmethodsio-examples/blob/master/twilio-send-sms/twilio-map.PNG) Click Next and complete the form. The resulting flow will look like as below. ![Twiliofinal](https://github.com/mangatrai/webmethodsio-examples/blob/master/twilio-send-sms/twilio-final-complete.PNG)The flow is now ready for testng in the webMethods.io UI

10. To make this a flow a useful Rest API, you need to return a response. This can be performed by adding a "Return Data on Sync Webhook" service step. In order to do this, in the search dialog lookup "Return" service and select  "Return Data on Sync Webhook" service, drag and drop into the flow canvas.
The resulting flow will look like as below ![returnresponselinked](https://github.com/mangatrai/webmethodsio-examples/blob/master/twilio-send-sms/add-return-hook.PNG) 

11.Configure the "Return Data on Sync Webhook" service by clicking on the gear icon on the service step, give it a name and click next

12. In this page map the response status code from Twilio function to Response data of the "Return Data on Sync Webhook" service. ![returnwebhookmapped](https://github.com/mangatrai/webmethodsio-examples/blob/master/twilio-send-sms/return-hook-map.PNG). Click Next and Done.

13. The flow is now ready to test as a Rest API from an external tool like Postman. Please make sure to grab the exposed Rest URL from the Webhook URL field in the first flow step(webhook) and use it as the Rest API URL. ![restcall](https://github.com/mangatrai/webmethodsio-examples/blob/master/twilio-send-sms/postman-execution.PNG). On Succesful execution a SMS will be delivered to the number provided in To field. ![sms](https://github.com/mangatrai/webmethodsio-examples/blob/master/twilio-send-sms/sms-screenshot.jpg)
