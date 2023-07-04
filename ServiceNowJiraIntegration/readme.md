***Author:** Bharath Meka ([@bharathreddy89](https://github.com/bharathreddy89))*
## ServiceNow – Jira integration
This webMethods.io Integration recipe integrates Jira and ServiceNow applications. The workflow creates an issue in Jira for every new incident in ServiceNow.

## Prerequisites 
* *Atlassian Jira account*
* *ServiceNow account*

## Setup
1.	Download the recipe archive (**ServiceNowJiraIntegration.zip**).
2.	Go to the project where you want to import the workflow and click **Import**.
![image](https://github.com/SoftwareAG/webMethods-io-examples/assets/23717841/84414e0e-2c3b-4409-81a0-6bb62e2a01ba)
3.	Find the archive on your computer and open it.
4.	On the next screen, you need to connect your Jira and ServiceNow accounts with webMethods.io Integration and provide the needed information.
![image](https://github.com/SoftwareAG/webMethods-io-examples/assets/23717841/ac7442b3-fc92-4f5a-b178-f1d48f9ea151)
> **Note:** You need to select an incident table in your ServiceNow project as a trigger.

When you are done, click **Import**.

This will import the workflow into the specified project.

![image](https://github.com/SoftwareAG/webMethods-io-examples/assets/23717841/2b48b170-fed9-487b-bc82-0d96c0fa8c82)
![image](https://github.com/SoftwareAG/webMethods-io-examples/assets/23717841/93c5a8af-fa5c-43bf-bb15-037d1532409b)
5.	You can now proceed with testing the workflow – simply add a new incident in your ServiceNow incident table, watch the workflow execution and create an issue in your Jira project.
