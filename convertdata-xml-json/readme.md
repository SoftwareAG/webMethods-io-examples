# Convert Data xml-json and send email

This example shows how easy it is,  to convert the data from one format to other format. We can pass any xml data in the rest api call and get that converted to json format.

## Prerequisite
Have some XML data handy to convert to Json


## Setup

1. Go ahead and get started creating a blank workflow. If you need a refresher on how to get to this point, this [guide](https://docs.webmethods.io/workflow-building-blocks/creating-first-workflow) can be a great introduction. Your starting point should resemble ![CreateWorkFlow](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/convertdata-xml-json/completeflow.png)

2. In the search dialog lookup "xml to json" service and select "XML to JSON" service, drag and drop it into the flow canvas. ![XML to JSON](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/convertdata-xml-json/XMLToJSONService.PNG) Connect the arrows automatically from start to the XML to JSON service icon. This inserts the 'XML to JSON' step in the flow. Hardcode the XML data which need to be converted to JSON.

3. Under XML to JSON service mapping map the input body to XML Data ![Mapping](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/convertdata-xml-json/XMLToJSONMapping.png)

4. We can configure send email if the converted data need to be sent over email to the respected audience. In the search dialog lookup "send an email" service and select "Send an Email" service, drag and drop it into the flow canvas. ![SendEmail](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/convertdata-xml-json/SendEmail.png)

5.Under Send an Email configuere the to address, cc, subject and map the body to Json data. ![SendEmailMapping](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/convertdata-xml-json/SendEmailMapping.png)

6.Your complete flow should looks like this.![CompleteFlow](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/convertdata-xml-json/completeflow.png)

6. Now test the flow by clicking on Test button. We can view the result in Action tab.![Testing](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/convertdata-xml-json/Testing.PNG)




