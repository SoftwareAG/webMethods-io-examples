# SMS My Tesla

This example shows how you can manage your Tesla with SMS using webMethods.io Integration. The functionality covers following SMS requests for Tesla:

1. Get State
2. Get Location
3. Unlock Doors
4. Lock Doors

## Overview

The logical flow of SMS to manage Tesla using webMethods.io is depicted in a below diagram.

![sms-tesla-sequence-1](sms-tesla-sequence-1.png)

The flow consists of:

1. User sends SMS message to Twilio phone number.
2. Twilio performs http post request to webMethods.io workflow.
3. webMethods.io workflow uses Tesla connector to send appropriate request to Tesla car.
4. webMethods.io workflow uses connector for Tesla to recieve appropriate response from step 3.
5. webMethods.io workflow uses Twilio connector to send appropriate response to Twilio.
6. Twilio sends SMS message to Mobile Phone from step 1.

Document References:

[webMethods.io Integration](https://docs.webmethods.io/integration/overview/basics/#gsc.tab=0)

[webMethods.io Workflow](https://docs.webmethods.io/integration/overview/basics/#co-what_workflow)


[webMethods.io Connector - Tesla](https://docs.webmethods.io/integration/connectors/connector-bundle/iot-c/#co-tesla&gsc.tab=0)

[webMethods.io Connector - Twilio](https://docs.webmethods.io/integration/connectors/connector-bundle/communication-c/#co-twilio&gsc.tab=0)


## Prerequisites

1. Twilio account with at least one phone number to receive and send SMS. Account SID and Auth Token from Twilio Account Dashboard.
2. Actual Tesla and your credential for Tesla account.
3. webMethods.io Integration account. 

## Setup

1. Log in to webMethods.io Integration. 

    Once you log in, you will be redirected to the dashboard. Here, you will see a Default project, and the + New Project option to create a new project. Projects are like folders that save your workflows within them and help you categorize your workflows. Read more about [Projects](https://docs.webmethods.io/integration/workflow_building_blocks/projects/#projects).

    Click on the Default project to create a new workflow within it.

2. Create a blank workflow. 

    Click the + New Workflow button. This will redirect you to a new window where you can choose the  option to 'Create Blank Workflow'

3. Rename the workflow.

    Click on the Edit icon given beside the workflow name, at the top-left corner of the canvas. A new window will appear, where you can add or modify workflow details such as name, tags, and description. Once you have entered these details, click on Done. This will take you back to the canvas.

4. Add Webhook to the workflow.

    Trigger is the starting point of a workflow. Therefore, the Start icon houses all the settings related to triggers. Hover on the Start icon, and click the Settings icon to add and configure a trigger. 
    
    a. Select Webhook for the trigger.

    ![webhook-trigger](wm-io-webhook-trigger.png)

    b. Copy Webhook URL to a notepad. This URL will be needed to be configured in Twilio. Click on Next button.

    ![webhook-trigger](wm-io-webhook-trigger-2.png)


    c. Add following json snippet to the body of Webhook. This makes it easier to map the input data in next set of actions. Note: the json snippet is what Twilio HTTP Post will send when a SMS message is received by the Twilio phone number.

    [twilio post - json snippet](twilio-post.txt)

    ![webhook-trigger](wm-io-webhook-trigger-3.png)

    d. Accept defaults in next 2 windows.

    ![webhook-trigger](wm-io-webhook-trigger-4.png)

    ![webhook-trigger](wm-io-webhook-trigger-5.png)

5. Add [Switch](https://docs.webmethods.io/integration/additional_features/switch/#gsc.tab=0) selection control to the workflow. 

    ![switch-selection-1](wm-io-switch-1.png)

    The Switch selection control will be connected from the Start. This switch will be configured to handle 2 conditions per the next step.

6. For Condition 1, add Twilio connector to the workflow. Make sure to connect 'Switch' and 'End'.

    ![wm-io-twilio-response-1](wm-io-twilio-response-1.png)


    a. Configure Switch 'case 1' per below:
    
        **Condition  will check for SMS message *not* containing either of the following words: 'State, Location, Lock, Unlock'.**
        
        i.  Click on 'case 1' flow that is connecting Switch and Twilio
            connector. Select Cog wheel to configure the settings for the 'case 1'.

    ![wm-io-switch-case-1](wm-io-switch-case-1.png)

        ii. Add transform to convert incoming SMS body to be upper case. This will be used for condition matching. Configure per below.

    ![wm-io-switch-case-2](wm-io-switch-case-2.png)
    
    ![wm-io-switch-case-3](wm-io-switch-case-3.png)

    Click button 'Done'.


        iii. Add Condition to check for incoming message. Use the transform value from previous step. The conditions are setup to not match string value 'state', 'location', 'lock', 'unlock'.

    ![wm-io-switch-case-4](wm-io-switch-case-4.png)         

        
    b. Configure Twilio connector.

        Configure Twilio connector to send SMS message to the requester when conditions are setup to not match string value 'state', 'location', 'lock', 'unlock'.

        i. Hover over the Twilio connector and select Cog wheel to configure the settings.

    ![wm-io-twilio-response-2](wm-io-twilio-response-2.png)


        ii. Configure per below.

            Set the value per below and click on + button.                    

    ![wm-io-twilio-response-3](wm-io-twilio-response-3.png)

            Set the Twilio Account SID and Auth Token value for your Twilio Account per below

    ![wm-io-twilio-response-4](wm-io-twilio-response-4.png)

            Map Incomming data to Twilio SMS per below. Note the field mappings:

            *$request - webhook/body/From* mapped to *To Number*.
            *$request - webhook/body/To* mapped to *From Number*.

            Set the value of Twilio SMS Message to 'Please text one of only following: state, location, lock, unlock'

    ![wm-io-twilio-response-5](wm-io-twilio-response-5.png)


    
7. For Condition 2, Add Tesla Connector which will be used to wake up your Tesla car.


    a. Connect Switch to Tesla Connector per below. This connector will be used to wake up  the Tesla car.

    ![wm-io-tesla-1](wm-io-tesla-1.png)

    b.  Click on 'case 2' flow that is connecting Switch and Tesla
     connector. Select Cog wheel to configure the settings for the 'case 2'. Configure the conditions per below. 
     
     Note: Upper Case transform of incoming Body. Configure 4 conditions for STATE, LOCATION, LOCK, UNLOCK.

    ![wm-io-switch-2](wm-io-switch-2.png)


    c. Configure Tesla connector to wake up the car. You will need credential for your tesla account.

        i. Hover over the Tesla connector and select Cog wheel to configure the settings.

    ![wm-io-tesla-2](wm-io-tesla-2.png)

        ii. Select Action 'Wake Up Car', and click on + button per below and select 'Default Authorization'.

    ![wm-io-tesla-3](wm-io-tesla-3.png)

        iii. Enter your credentials for Tesla account.

    ![wm-io-tesla-4](wm-io-tesla-4.png)

        iv. Provide account name; can be any name as this will be used later in this setup.

    ![wm-io-tesla-5](wm-io-tesla-5.png)

        v. Select your Vehicle Id. One or more vehicles will be listed from your Tesla account. Accept default in next set of screen(s).

    ![wm-io-tesla-6](wm-io-tesla-6.png)

8. Add Switch selection control. Connect Tesla 'Wake My Car' to the newly added Switch control.

    ![wm-io-switch-3](wm-io-switch-3.png)

9. Add Tesla connector. Connect Switch selection control to newly added Tesla connector. This Tesla connector will be configured to get the state of your Tesla car and repond the state back as a SMS to the mobile phone.

    i. Configure 'Case 1' to check for incoming sms body message to match 'state'. 

    ![wm-io-switch-case-5](wm-io-switch-case-5.png)

    ii. Configure Tesla connector to use 'Get Vehicl State' of your Tesla car per below set of screens. You do not need to add new authorization for your Tesla connector as authorization has already been registered and can be reused. Also, use the same vehicle id as used in previous Tesla configuration because the state of same vehicle that was woken up in the previous Tesla connector. Make sure to 'Test' the connector so that response is retrieved and can used on next set of actions.

    ![wm-io-tesla-7](wm-io-tesla-7.png)

    ![wm-io-tesla-8](wm-io-tesla-8.png)

    ![wm-io-tesla-9](wm-io-tesla-9.png)

10. Add and configure Twilio connector to send state of your Tesla car as SMS back to the mobile phone number. Connect 'Get Vehicle State' Tesla connector to newly added Twilio connector; connect Twilio connector to End. See screens below for configuration.


    ![wm-io-tesla-get-state-flow](wm-io-tesla-get-state-flow.png)

    ![wm-io-twilio-response-6](wm-io-twilio-response-6.png)

    Map Incomming data to Twilio SMS per below. Note the field mappings:

            *$request - webhook/body/From* mapped to *To Number*.
            *$request - webhook/body/To* mapped to *From Number*.

            Set the value of Twilio SMS Message to include following

            Vehicle: $a4 - Get Vehicle State/vehicle_name
            Vehicle: $a4 - Get Vehicle State/locked
            Vehicle: $a4 - Get Vehicle State/is)user_present            

    ![wm-io-twilio-response-7](wm-io-twilio-response-7.png)


11. Add and configure Twilio connector to SMS location of your Tesla car to the mobile phone number. 

    i. Add Tesla connector. Connect Switch selection control to newly added Tesla connector. This Tesla connector will be configured to get the location of your Tesla car and repond the location back as a SMS to the mobile phone.

    Add Twilio connector. Connect Tesla connector to newly added Twilio connector. Connect Twilio connector to End. 

    ii. Configure 'Case 2' to check for incoming sms body message to match 'LOCATION'.

    iii.  Configure Tesla connector to 'Get Vehicle State and Location'.

    iv. Configure Twilio connector to SMS location of Tesla car to the mobile phone number.

12. Add and configure Twilio connector to lock your Tesla car. 

    i. Add Tesla connector. Connect Switch selection control to newly added Tesla connector. This Tesla connector will be configured to Lock Doors of your Tesla car.

    ii. Add Twilio connector. Connect Tesla connector to newly added Twilio connector. Connect Twilio connector to End. 

    iii. Configure 'Case 3' to check for incoming sms body message to match 'LOCK'.

    iv.  Configure Tesla connector to 'Lock Doors'.

    ![wm-io-tesla-10](wm-io-tesla-10.png)

    v. Configure Twilio connector to SMS result of Tesla Connector 'Lock Doors' action to the mobile phone number.

    ![wm-io-twilio-response-8](wm-io-twilio-response-8.png)

        Create a Transform that 'Stringify' result of 'Lock Doors' action as the result is a boolean value.

    ![wm-io-tesla-11](wm-io-tesla-11.png)

        Map following values for Twilio.

            *$request - webhook/body/From* mapped to *To Number*.
            *$request - webhook/body/To* mapped to *From Number*.

            Transform for strigified result to Message

    ![wm-io-twilio-response-9](wm-io-twilio-response-9.png)        


13. Add and configure Twilio connector to unlock your Tesla car. 

    i. Add Tesla connector. Connect Switch selection control to newly added Tesla connector. This Tesla connector will be configured to Unock Doors of your Tesla car.

    ii. Add Twilio connector. Connect Tesla connector to newly added Twilio connector. Connect Twilio connector to End. 

    iii. Configure 'Case 4' to check for incoming sms body message to match 'UNLOCK'.

    iv.  Configure Tesla connector to 'Unlock Doors'.

    ![wm-io-tesla-12](wm-io-tesla-12.png)
    
    v. Configure Twilio connector to SMS result of Tesla Connector 'Unlock Doors' action to the mobile phone number.

    ![wm-io-twilio-response-10](wm-io-twilio-response-10.png)  

        Create a Transform that 'Stringify' result of 'Unlock Doors' action as the result is a boolean value.

    ![wm-io-twilio-response-11](wm-io-twilio-response-11.png)

        Map following values for Twilio.

            *$request - webhook/body/From* mapped to *To Number*.
            *$request - webhook/body/To* mapped to *From Number*.

            Transform for strigified result to Message

    ![wm-io-twilio-response-12](wm-io-twilio-response-12.png)        


14. Configure Twilio phone number to send http post request to the webhook of the workflow.

    a. Login in to your Twilio Account: https://www.twilio.com/login
    
    b. Navigate to Active Numbers: https://www.twilio.com/console/phone-numbers/incoming

    c. Click on one of your phone number that you want to use to post SMS messages to webMethods.io Integration Flow

    ![wm-io-twilio-config-1](wm-io-twilio-config-1.png) 

    d. Navigate to Messaging section of the Twilio phone number and add the URL of webhook of the workflow.

    ![wm-io-twilio-config-2](wm-io-twilio-config-2.png) 

15. You can test by sending following SMS to your Twilio phone number: State, Location, Lock and Lock. 

![sms-my-tesla-test-1](sms-my-tesla-test-1.png)

## Additional 

1. Use authentication token to secure your webhook: https://docs.webmethods.io/integration/developer_guide/webhook/#ta-webhook_authentication.

2. Add delay timer after Tesla Connector for 'Wake Up CAr' to account for delay in your Tesla waking up. Delay timer is available under Developer Tools.

3. webMethods.io Integration Documentation: https://docs.webmethods.io/integration/starthere/home/#gsc.tab=0.

4. You can configure Location SMS to send Google Maps Marker by adding following in Twilio Message include latitude and longitude variables: Vehicle Location: 
https://www.google.com/maps/search/?api=1&query=*latitude*,*longitude*.

5. Completed solution [sms-my-tesla.zip](sms-my-tesla.zip) can be imported per [instructions](https://docs.webmethods.io/integration/workflow_building_blocks/recipes/#co-importing_workflow).



