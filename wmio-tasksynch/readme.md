# Task Synchronization

This example demonstrates how to keep two task management applications in synch using webMethods.io Integration capabilities. 

A possible requirement would be that some tasks created in a task management application at work need to be created (and updated) in some private task app

It is based on the following two scenarios (workflows), 
* Synchronize creation of tasks
* Synchronize task status updates

It is also a demonstrator for the generic concept of **_cross-referencing_** object IDs, a common integration pattern. 

## Prerequisites

To follow the steps in this example, you need user accounts for the following two task management apps: 
* Todoist - [www.todoist.com](www.todoist.com)
* Wunderlist - [www.wunderlist.com](www.wunderlist.com)

Free accounts are sufficient to test the examples here.  
Additionally, you need valid credentials for webMethods.io Integration - [https://www.softwareag.cloud/site/product/webmethods-io-integration.html#/](https://www.softwareag.cloud/site/product/webmethods-io-integration.html#/). 

To start, you need to log into webMethods cloud and create an empty project in webMethods.io Integration. 

## Workflow 1: Synchronize Task Creation

Create a new workflow, call it something like “synchNewTasks” and provide a meaningful description

![P1](./images/Image002.png)

You have a fresh “canvas” where you can start to draw your integration workflow by
configuring Triggers (that start the workflow) and other workflow steps by choosing from the palette
on the right.

### Let’s first configure a trigger for the workflow:

Click on the green arrow symbol on the canvas and configure the properties of the start step. If you
start typing the name of the application you will see all triggers with that name.

In our example, you want the workflow to be triggered in case of a new task created in the “Todoist”. 

Start typing “Todo...” and select “Todoist” from the list.

![P2](./images/Image003.png)

Now you have to configure the trigger by selecting the Trigger action “Task Created”, providing a
Label for the step and – since it is the first time we are accessing Todoist, we also need to authorize
ourselves against Todoist.

On the Authorize box, click on the + Sign and select “Default Authorization”. This will use the built in
Authorization mechanisms to connect to Todoist and get access keys for the API etc. This all happens
in the background and the user does not need to care.

![P4](./images/Image004.png)

Select “Allow” to allow webMethods.io to access Todoist information.

![P5](./images/Image005.png)

Now that you have access to Todoist you can can complete the configuration of the trigger, by
providing the Project name from the drop down box.

![P6](./images/Image006.png)

At this point we can save and test the trigger interactively. 

Switch to the Todoist application (either on your mobile or in a different browser tab) and create a
new Task in the “Inbox” Project in Todoist.

Then switch back to your workflow and click “Test”

![P1](./images/Image007.png)

Examine the data provided in the response. You will find the task name and Id, as well as project and
user identification information. Click “Done” and you have successfully configured the first step of
the workflow and interactively tested that it is working.

### Creating a task 

Next we add a step to update Wunderlist with the new task created in Todoist.

For this we can select the Wunderlist step from the palette on the right and drag it to the canvas. If
you start typing the name, it will make it easier to find the step:

![P1](./images/Image008.png)    ![P1](file://images/Image009.png)

By clicking on the symbol on the canvas and selecting the gear symbol, you can configure the
settings of the step.

Set the Action and Name according to the task at hand. Again, since we are accessing Wunderlist for
the first time, we have to create an authorization object by clicking on the + Symbol and chosing
“Default Authorization”. Note how easy it is to set up authentication / authorization to SaaS apps
using webMethods.io Integration

![P1](./images/Image010.png)

When you click “Next” you get to the mapping screen, where you can map fields from upstream
workflow steps to the current step parameters. THe “Create Task” operation of the Wunderlist
connector requires some information, like “List ID” and “Task Title”. YOu can either select values
from the dropdown listbox or map values from the left hand panel.

We select “Inbox” as the List ID and map the Todoist Task “content” field to the “Task title” of
Wunderlist, as well as the Due date fields.

![P1](./images/Image011.png)

By clicking next, you can again test the mapping / invocation of the createTask in Wunderlist


![P1](./images/Image012.png)

Note that the actions are actually performed, so you will find a new task in Wunderlist if you look at
the “Inbox” there. Note that sometimes you have to refresh (F5) in order to see updates in the
applications.

![P1](./images/Image013.png)

### Adding notifications

Now we add a notification step – so that someone receives an email when a new task is created. We
could map the mail address from the task object, or notify a fixed user. 

To demonstrate project parameters, we will define an adminEmail address where we will send notifications to.
Open the Workflow settings page and create a new parameter “adminEMail” for this purpose

![P1](./images/Image015.png)

Now we can drag a “Notification” step from the tools palette to the canvas and configure it to send a
notification mail

![P1](./images/Image016.png)

![P1](./images/Image017.png)

The body of the email can contain a mix of free text and fields mapped from the left side in a single
text field, e.g. the mail body. The email “to:” address can be mapped from the just created project
parameter value.

Naturally , you can test the Email notification action as usual, which will actually send an email to the
address defined.

### Error handling

Last, but not least, we can configure a “catch all” Error handler at the worflow level. If any of the
steps fails, the workflow will invoke this “Global Error Handler” subworkflow.

![P1](./images/Image018.png)

To use it, you drag a “global error handler” icon on the canvas and configure some step inside it, as
an example you could send yet another notification mail containing the error message

![P1](./images/Image019.png)

And we are done with the first, easy version of our workflow.

### Testing it all

We can now test it end to end, by saving it and creating a new task in the Todoist Inbox.

![P1](./images/Image020.png)

The workflow should trigger after a short moment and the activity / steps will highlight while they
are executed. 

If you open the debug window (using the symbol in the bottom left corner of the
screen) you see the variables and values used to run the workflow, as well as the execution times.


![P1](./images/Image021.png)

To validate that the notification has arrived, oben your mail inbox:

![P1](./images/Image022.png)

And to validate that the end-to-end process has worked correctly, we can open the Inbox in
Wunderlist (don’t forget to refresh F5):

![P1](./images/Image023.png)

## Scenario 2: Synchronize Task Updates

OK, so now this takes care of synchronizing new tasks, but what about task updates, for example if I
close / complete a task ? 
We don’t want to have to maintain the state manually, so we’ll have to
create another workflow to actually complete the task in Wunderlist, when we complete it in
Todoist.

Let’s create a second workflow in the same project and provide a meaningful name / description

![P1](./images/Image024.png)

### Triggering on change 

Again, we need to trigger the workflow, this time we will do it based on a “Task completion” action
from Todoist. Let’s configure the Todoist Trigger, by selecting “Create a new event for Todoist” at
the top of the dialog and creating a Task Completed event as follows:

![P1](./images/Image026.png)

Note that we can reuse the Authorisation credentials from the other workflow – they are available
across all workflows in the same project.

And of course, testing is a good idea:

![P1](./images/Image027.png)

### Task update step

The next obvious step would be to create a Wunderlist “Update Task” step.
When we try to do that, hower, we will find out that it requires a Task ID and a Revision number to
identify which task to update.

![P1](./images/Image029.png)

Hmmm.... so how do we find out which Task ID in Wunderlist corresponds to the Task of Todoist ?
Correct – we need to store a cross-reference mapping across the workflows.

So we need to extend the previuosly built workflow to store the mapping between Todoist ID and
Wundist ID when we create the task, and we need to retrieve the mapping before we update the
task in Wunderlist again.

### ID correlation 

Since we are in the Update workflow, let’s finish building that one first, and then go back to the
“Create” workflow to store the ID mapping later.

For storage across workflows, we need to use the “Account Store” workflow step. (the others are
valid only within one workflow).

![P1](./images/Image031.png)

And configure it as follows:

![P1](./images/Image032.png)

Continue to drag and drop workflow steps to the canvas to achieve the following picture:

![P1](./images/Image040.png)

Now we can go about configuring the steps above as follows:

The first Logging step will be used to log the task IDs from Todoist to Wunderlist, and we also need
to extract the Id, we do that by creating a transformation of type (Object -> Get)

![P1](./images/Image034.png)

Now that we have the Wunderlist task ID as an output of the previous step, we can use it to configure the step “Get Task Details” like
so:

![P1](./images/Image041.png)

This gives us the Task details, including all the fields like Revision Number etc. To update the task
details:

![P1](./images/Image042.png)

### Update the task creation workflow

Now that we have configured all the steps in the “update” workflow, we go back to the “createTask”
workflow to store the key pairs when a new task is created.

So we save / close this workflow and open “create” workflow again – and we insert an new “Account
Store” step to save the keypair like this:

![P1](./images/Image044.png)

Now the ”synchNewTask” workflow should look like this:


![P1](./images/Image046.png)

### Testing it all 

We’re ready to test again, end to end. 
We create a new task in the Todoist Inbox:

![P1](./images/Image045.png)

In the debugging window, we can see the IDs mapping

![P1](./images/Image047.png)

The new task shows up in Wunderlist:

![P1](./images/Image048.png)

Next, close the task in Todoist by clicking on the Task.

In the synchCloseTask workflow, you should see the following happening:

![P1](./images/Image049.png)

The Todo / Task will disappear from Wunderlist Inbox as well.

# Summary

We have seen how two task application can be kept in synch using a simple cross-referencing integration pattern. 
The two simple workflows are working together to store the correlation of different task IDs and use that information to update the status of the tasks when they are updated in one system. 
Extending the example to other scenarios, or to bidirectional synchronization - as well as modifying it to support other task applications should be relatively straightforward. 










