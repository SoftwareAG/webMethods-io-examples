# Pager Duty -> Slack

This examples guides you to trigger Slack comments when Pagerduty issues are triggered. This is straightforward and you should be up and running in a good case about 15 minutes and in a bad case an hour or two to troubleshoot some credential issues.

## Setup

1. Starting from a blank workflow, select the gear at the top of the start icon and choose pagerduty. ![this](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/pager-slack/pager1.png)

2. Select the pencil icon and setup the connection to Pagerduty ![this](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/pager-slack/pager2.png)

3. Select the plus sign and enable the connection using the oauth dialog. Credentials to a live Pagerduty account will be required. ![this](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/pager-slack/pager3.png)

4. Once the Pagerduty trigger is completed (feel free to test it if you wish to feel certain before moving on), select Slack on the right hand dialog. ![this](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/pager-slack/slack1.png)

5. Drag Slack to the canvas and connect it from Pagerduty and to the end icon. ![this](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/pager-slack/slack2.png)

6. Now select the gear icon over Slack and configure which channel to post onto. This will require setting up or using an existing Slack connection. Again, this can be completed with OAuth. ![this](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/pager-slack/slack3.png)

7. After Slack is authorized, select next. Now you can configure what channel to place the message in and how that message is structured. Rich customization is offered at this step, but for now select a public channel and place some test text to get started. Once the connection is working we can circle back and improve the message to a useful description of the incident, etc. ![this](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/pager-slack/slack4.png)

8. When you choose a channel, you will see it confirmed in the Webmethods.io dialog. ![this](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/pager-slack/slack5.png)

9. Once the message is configured and you select next, you will be given the opportunity to review the message and potentially post it to the channel in a test configuration. ![this](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/pager-slack/slack6.png)

10. Finally, save the flow and test it. You can manually create incidents in Pagerduty and then if all goes well see the information regarding the incident posted in Slack. ![this](https://github.com/SoftwareAG/webmethodsio-examples/blob/master/pager-slack/slack7.png)