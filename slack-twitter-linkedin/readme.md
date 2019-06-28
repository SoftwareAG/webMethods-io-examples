# Slack-Twitter-LinkedIn
In this example we will post a message and youtube link into a Slack channel and webMethods will post to Twitter and LinkedIn

## Prerequisites
I. Slack account

II. Twitter account

III. LinkedIn account
  
## Set Up

1. Lets start by creating a new workflow from scartch, you should now see a workflow canvas shown below.

<img width="500" alt="canvas" src="https://user-images.githubusercontent.com/52167245/60108670-01297380-9737-11e9-8d4d-4a9fbf3459f9.PNG">

2. Double click the start icon, scroll down the list of triggers and select Slack. You will now be able to set a label name for your Trigger. We will select the Trigger to be "New Message in Public Channel". If this is your first time connecting Slack, you will have to click the "+" button and authorize webMethods access to your Slack account. Last you will have to enter your Slack Channel ID you wish to use. Click "Save", "Test", and "Done" once the test is complete.

<img width="274" alt="slack-auth" src="https://user-images.githubusercontent.com/52167245/60348648-06343000-998e-11e9-903c-6e53303bdf57.PNG">

3. Click and drop the Twitter icon from the list of application on the right panel onto the canvas. Connect the start icon to the Twitter icon and also connect the Twitter icon to the end icon. Repeat the same steps for the LinkedIn icon. Your canvas should now look like the below example.

<img width="327" alt="canvas" src="https://user-images.githubusercontent.com/52167245/60348935-89ee1c80-998e-11e9-922e-d4dd6010bbc3.PNG">

4. Double click the Twitter icon and from the list of Actions select "Post Tweet". You will now have to click the "+" sign and enter your account credentials to allow access, when finished click "Next".

<img width="316" alt="posttweet" src="https://user-images.githubusercontent.com/52167245/60349435-98890380-998f-11e9-8ce1-3a9ee0572150.PNG">

5. From the mapping screen we will now enter the Trigger Text into the Tweet Action field. Click the "Next" button and Test your configured Data. When test has passed click the "Done" button.

<img width="400" alt="tweetdata" src="https://user-images.githubusercontent.com/52167245/60349777-3ed50900-9990-11e9-91f0-de2f864e4888.PNG">

6. Double click the LinkedIn icon and from the list of Actions select "Share On LinkedIn". You will now have to click the "+" sign and enter your account credentials to allow access, when finished click "Next".

<img width="307" alt="linkedaccess" src="https://user-images.githubusercontent.com/52167245/60350275-39c48980-9991-11e9-86fc-bafb200d8804.PNG">

7. From the mapping screen we will now enter the Trigger Text into the Comment Action field. We will also select the Trigger from_url under the attachments dropdown into the URL Action field. Click the "Next" button and Test your configured Data. When test has passed click the "Done" button.

<img width="392" alt="linkeddata" src="https://user-images.githubusercontent.com/52167245/60350710-1b12c280-9992-11e9-9582-0819b76f2664.PNG">

8. It is very important to remeber to save your workflow in order to start executing the workflow!

<img width="130" alt="save" src="https://user-images.githubusercontent.com/52167245/60111517-12c14a00-973c-11e9-8dfd-21272ca28b2b.PNG">

9. To test the workflow now, post a message and a youtube url into your specified Slack channel, you will see the workflow execute, posting the message and youtube video to your Twitter and LinkedIn accounts.
