# Hello Email

This examples guides you on a simple webmethods hello world that uses no external SaaS services, but does assume you have access to an email client. The guide shows how to setup an rest api endpoint in webmethodsio (webhook) and output an email when the api is accessed, which can be easily accomplished with a simple GET request from Curl, Postman or even your internet browser.

## Setup

1. Go ahead and get started creating a blank workflow. If you need a refresher on how to get to this point, this [guide](https://docs.webmethods.io/workflow-building-blocks/creating-first-workflow) can be a great introduction. Your starting point should resemble ![this](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/hello-email/Creating_First_Workflow.png)

2. The Webhook is created by modifying the start icon, which is is the entrypoint to the new flow. Please select the gear on top of the start icon to access settings. Once settings is selected in the start icon, a 'trigger' dialog will appear that allows Webhook to be selected.![trigger](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/hello-email/trigger.PNG) 

3. Leave Webhook Authentication and Webhook Payload unchecked for now and hit next. Feel free to modify these if desired, they are easy to return to and iterate as well. At the very least, Authentication should be added immedately after 'Hello world' is working. Note the webhook url and save this for later. ![webhook](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/hello-email/webhook.jpg)

(Optional) You can curl the webhook url at this point as a type of preliminary test. The url will state that it exists but will return an error message as the entire flow has not been completed and saved yet.

```bash
curl https://<cloudname>.int-aws-us.webmethods.io/runflow/run/xxxxxxx 
```
which will return this if the url is correct.

```
{"error":"Parameters missing. Please provide all required parameters in actions before running workflow","code":126}
```

And if the url is incorrect, you will receive:

```
{"message":"Workflow not found.","code":103}
```

4. Select done once presented with the final dialog. You should now see the start arrow dialog replaced with a webhook icon. ![webhookconfigured](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/hello-email/webhookconfigured.PNG)

5. Now lets have the flow do something once the webhook receives a request. Search in the search dialog for 'email' and find the 'Send an Email' notification. ![sendemailrightdialog](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/hello-email/sendemailrightdialog.PNG)

6. Select the 'Send an Email' and drag it between the start and end icons. Connect the arrows from start to the email icon and then to the end icon. This inserts the 'Send an Email' step in the flow. (optional) If you are obsessive compulsive like me, spend an extra five minutes making sure the arrow lines between start, email and end are completely straight. ![straightemail](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/hello-email/straightemail.PNG)

7. Next, select the gear icon at the top of the email icon. You should land in a dialog that enables you to name the email step. Change the name if you like (or leave it the same) and select Next. ![sendemail](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/hello-email/sendemail.PNG)

8. Initially, you can fill in the 'To', 'Subject' and 'Body' required fills with any text you like. ![emailtosubject](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/hello-email/emailtosubject.PNG)
(Optional) Fill the subject and body with information from the webhook to create a more interesting demo email. ![optionalemail](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/hello-email/optionalemail.PNG)

9. Select next and then you will be provided with a dialog that allows an overview of the email payload and the capability to test the connect. Go ahead and hit test, wait a minute and see if the email arrives in your inbox. If everything is satisfactory go ahead and select 'Done'. ![testinitialemail](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/hello-email/testinitialemail.PNG)

10. Assuming the steps so far are satisfactory, go ahead and select 'Test' in the top right to trigger a test of the entire workflow. This should deliver a dummy email to you inbox. Once this happens go ahead and press 'Save' to save and enable the workflow. ![testemail](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/hello-email/testemail.PNG)

11. Test workflow

### Curl command example

```
curl https://<cloudname>.int-aws-us.webmethods.io/runflow/run/xxxxxxx 
```

If all goes well, you will see something similiar

```
{"message":"Workflow enqueued successfully.","code":123,"bill_uid":"123123123123123","flow_uid":"1231231234","tenant_uid":"123123123"}
```

### Postman example

Just put your url into the 'Get' dialog box and hit send. If all goes well you will see a 'Workflow enqueud successfully' response and receive an email shortly after. 

![postman](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/hello-email/postman.PNG)

### Internet browser example

Copy and paste the Web Methods trigger url, for example (https://<cloudname>.int-aws-us.webmethods.io/runflow/run/xxxxxxx), into your favorite internet browser will also work if Curl or Postman are not readily accessible to you.
