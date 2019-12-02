# Cumulocity Alarm To FreshDesk Ticket with Global Error Handling

This example shows how easy it is,  to create the freshdesk ticket for each device alarms created in cumulocity.

## Prerequisite
We should have the device added to cumulocity SaaS and an alarm should be created for device health monitoring
We should have a FreshDesk access to create the tickets


## Setup

1. Go ahead and get started creating a blank workflow. If you need a refresher on how to get to this point, this [guide](https://docs.webmethods.io/workflow-building-blocks/creating-first-workflow) can be a great introduction. Your starting point should resemble ![CreateWorkFlow](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/cumulocitytofreshdesk/createworkflow.PNG)

2.  Add the cumulocity trigger by editing the start button and selecting the cumulocity trigger from the search result.![CumulocityTrigger](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/cumulocitytofreshdesk/cumulocitytrigger.PNG)

3.  Enter the cumulocity connection details and also trigger details. Select Trigger as Alarm and Device ID.![CumulocityConnection](
https://github.com/SoftwareAG/webmethodsio-examples/blob/master/cumulocitytofreshdesk/cumulocityconnection.PNG)

4.  Add the FreshDesk service in the canvas by searching under available services.![AddFreshDeskService](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/cumulocitytofreshdesk/addfreshdeskservice.PNG)

5.  Click on the small settings icon on the freshdesk service to add the action "create ticket". ![SelectFreshDeskAction](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/cumulocitytofreshdesk/selectfreshdeskaction.PNG)

6.  Add the fresh desk connection details to create the connection to freshdesk.![FreshDeskConnection](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/cumulocitytofreshdesk/freshdeskconnection.PNG)

7. Now map the required data from cumulocity alarm to freshdesk ticket. Do not forget to map the required fields.![Mapping](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/cumulocitytofreshdesk/mapping.PNG)

8.  We have a cool feature which is logging where you can log the necessary unique data so that you can visualize the data in monitoring workflows. Search for logging and drag and drop the logging service to canvas.![addlogger](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/cumulocitytofreshdesk/addlogger.PNG)

9.  Map the required fields in the logging. In the below example we have mapped the complete cumulocity alarm information.![AddLogger](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/cumulocitytofreshdesk/loggermapping.PNG)

10. This completes the workflow and connect to stop step. We can add the global error handler for the complete workflow. If any error happens in the workflow is catch the error by the global error handler.![AddGlobalErrorHandler](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/cumulocitytofreshdesk/addglobalerrorhandler.PNG)

11. If any error happens we  create one more ticket in the freshdesk so that necessary actions can be taken. Do the mapping for freahdesk ticket.![GlobalErrorHandlerMapping](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/cumulocitytofreshdesk/globalerrorhandlermapping.PNG)

12. This is the complete workflow looks like. ![completeworkflow](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/cumulocitytofreshdesk/completeworkflow.PNG) 

13. We can test the success scenario by creating the cumulocity alarm for the device added. ![SuccessTesting](
https://github.com/SoftwareAG/webmethodsio-examples/blob/master/cumulocitytofreshdesk/successtesting.PNG)

14. We can test the negative scenario by not passing the required field while creating the freshdesh ticket. This scenario will invoke the global error handler.![SuccessTesting](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/cumulocitytofreshdesk/errortesting.PNG)
