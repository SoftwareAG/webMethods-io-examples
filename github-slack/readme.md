In this project we will create a workflow that will be triggered on a GitHub Pull request and push the status and additional information to a specified Slack Channel.

## Setup

1. Start a new blank workflow 

<img width="500" alt="canvas" src="https://user-images.githubusercontent.com/52167245/60035125-1b514c00-967a-11e9-9579-dbd69d6958ae.PNG">

2. Click the start button and find GitHub, authorize access to GitHub and select "Push" as the Trigger and select the Repository name you would like to use. Test the trigger and save.

<img width="260" alt="githubAuthorization" src="https://user-images.githubusercontent.com/52167245/60036024-3fae2800-967c-11e9-88fe-869a53bdf0d0.PNG">

3. Search for Slack on the right hand pannel and drag and drop the slack action icon onto the canvas. Connect Github to Slack and from Slack to the end icon.

<img width="377" alt="connectWorkflow" src="https://user-images.githubusercontent.com/52167245/60037079-b4826180-967e-11e9-86c5-62d4172189d3.PNG">

4. Open the Slack action icon, configure the action to "Post Message to Channel". Authorize Slack and click the "Next" button.

<img width="299" alt="slackAuth" src="https://user-images.githubusercontent.com/52167245/60039014-c4507480-9683-11e9-9317-9e0758c57594.PNG">

5. On the mapping screen, select the slack channel you want GitHub data to be sent to. In the "Text*" field click from the GitHub drop down to personalize the information you want posted into the specified Slack Channel. Click "Next"

<img width="445" alt="salckMessage" src="https://user-images.githubusercontent.com/52167245/60039242-417be980-9684-11e9-9ffc-cad8bdbe92b4.PNG">

6. It is recomended to "Test" the action and you should see a sample message posted to your slack channel with sample data. Click "Done"

<img width="391" alt="slackTest" src="https://user-images.githubusercontent.com/52167245/60039564-05955400-9685-11e9-89e0-8e344dfad3fa.PNG">

7. It is important to remeber to save your workflow as you edit the canvas. 

<img width="120" alt="save" src="https://user-images.githubusercontent.com/52167245/60039800-979d5c80-9685-11e9-8815-bd4cf602c4f3.PNG">

8. Now it is time to test our workflow. Go to github and execute a Pull request, check your specified Slack channel to see your tailored data. You can also see the execution of the workflow in webMethods with a blue markup.

<img width="427" alt="successPull" src="https://user-images.githubusercontent.com/52167245/60040084-31650980-9686-11e9-8ae2-20bfff2d9ea7.PNG">
