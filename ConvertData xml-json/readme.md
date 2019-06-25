# Convert Data xml-json and send email

This example shows how easy it is,  to convert the data from one format to other format. We can pass any xml data in the rest api call and get that converted to json format.

## Prerequisite

Postman to invoke the webhook api with the XML data in the body


## Setup

1. Go ahead and get started creating a blank workflow. If you need a refresher on how to get to this point, this [guide](https://docs.webmethods.io/workflow-building-blocks/creating-first-workflow) can be a great introduction. Your starting point should resemble ![this]()

2. The Webhook is created by modifying the start icon, which is is the entrypoint to the new flow. Please select the gear on top of the start icon to access settings. Once settings is selected in the start icon, a 'trigger' dialog will appear that allows Webhook to be selected.![trigger]() 

3. Leave Webhook Authentication unchecked. Check/Enable Webhook Payload, add the structure of the input payload into the "Body" text area and click next. Note the webhook url and save this for later. ![webhook]()  ![webhookpayload]() 

4. Select done once presented with the final dialog. You should now see the start arrow dialog replaced with a webhook icon. ![webhookconfigured]()


5. Now the flow is ready to process, once the webhook receives the request. In the search dialog lookup "xml to json" service and select "XML to JSON" service, drag and drop it into the flow canvas. ![XML to JSON]() Connect the arrows from start to the webhook icon and then to the XML to JSON service icon. This inserts the 'XML to JSON' step in the flow. 

6. Under XML to JSON service mapping map the input body to XML Data ![Mapping]()

7. We can configure send email if the converted data need to be sent over email to the respected audience. In the search dialog lookup "send an email" service and select "Send an Email" service, drag and drop it into the flow canvas. ![SendEmail]()

8.Under Send an Email configuere the to address, cc, subject and map the body to Json data. ![SendEmailMapping]()

9. To make this a flow a useful Rest API, you need to return a response. This can be performed by adding a "Return Data on Sync Webhook" service step. In order to do this, in the search dialog lookup "Return" service and select  "Return Data on Sync Webhook" service, drag and drop into the flow canvas. ![returnresponse]() The resulting flow will look like as below ![returnresponselinked]() 

11.Configure the "Return Data on Sync Webhook" service by clicking on the gear icon on the service step, give it a name and click next

12. In this page map the response status code from a function to Response data of the "Return Data on Sync Webhook" service. ![returnwebhookmapped](https://github.com/flyondeals/webmethodsio-examples/blob/master/aws-lamda/return_webhook_mapped.png)

13. The flow is now ready to test as a Rest API from an external tool like Postman. Please make sure to grab the exposed Rest URL from the Webhook URL field in the first flow step(webhook) and use it as the Rest API URL. ![restcall]()

