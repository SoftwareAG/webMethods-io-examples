# Detect spam forum posts with webMethods.io Integration ChatGPT connector 

This is a simple workflow example of how to use [webMethods.io Integration ChatGPT API connector](https://tech.forums.softwareag.com/t/webmethods-io-chatgpt-api-connector-available-now/268371) to filter forum spam messages. The example below uses Discourse's API but will also work with any application that has an API you can access.

## Prerequisite

* webMethods.io Integration tenant - [sign up](https://signup.softwareag.cloud/#/basic?product=webmethodsioint) for a free forever trial if you're new
* an OpenAI account and an API key, [Overview - OpenAI API](https://platform.openai.com/overview)

## Setup

1. Create a new project or choose an existing one.

2. Go ahead and get started by creating a blank workflow. If you need a refresher on how to get to this point, [this guide](https://docs.webmethods.io/integration/workflow_building_blocks/creating_first_workflow/#gsc.tab=0) can be a great introduction.

3. The first step is to set a RSS feeds trigger which will automatically start the workflow once a new forum post is submitted.
Hover over the Start step and click the gear icon. Find the RSS feeds trigger and configure it – enter RSS Feed URL and perform a test.

![3](https://user-images.githubusercontent.com/45091718/226317520-d89e7e8c-4b93-4a2d-9551-5f5184462893.png) ![3 1](https://user-images.githubusercontent.com/45091718/226317550-8ead02aa-b3ae-434b-a8a1-6f8771698748.png)

4. Next, search for the ChatGPT connector and add it to the canvas. To configure it provide your API key and fill out all necessary fields – use the prompt field to ask ChatGPT anything.

![4](https://user-images.githubusercontent.com/45091718/226317901-8f9c9f8d-344e-4ffd-ac2e-80b7cc2c78fa.png)

In this example the ChatGPT connector setup looks like this:

![4 1](https://user-images.githubusercontent.com/45091718/226317926-e516d0d2-fa81-4c1c-87da-065d9871d40d.png)

**Model:** *text-davinci-003* <br/>
**Prompt:** *Does this post in the Software AG Tech Community support forum sound like spam?
{{$trigger.description}}* (from the Incoming data panel add the post content fetched by the RSS feeds trigger) <br/>
**max_tokens:** *35*

5. Then you can choose what are the next steps if the post is defined by ChatGPT as spam.

Add two arrows that come out of the ChatGPT connector. Hover over the first one and click the gear icon. Then set up a condition if the ChatGPT answer matches ‘Yes’. Connect the arrow to the next action.

![5](https://user-images.githubusercontent.com/45091718/226318166-eb87fceb-d7e0-432e-80ca-cc59fcb79072.png)

This example sends a POST API request to Discourse API which flags the post as spam, hides it and sends it to the review queue. The HTTP Request connector setup looks like this:

**HTTP method:** Post <br/>
**URL**: `https://{defaultHost}/post_actions.json`<br/>
**Headers:**
```
Key: Api-Username
Value: username

Key: Api-Key
Value: key
```
**Set Body Type:** x-www-form-urlencoded <br/>
**Body:**
```
Name: id
Value: get the post id from the Incoming data panel

Name: post_action_type_id
Value: 8
```

If the post is not spam, set up a condition if the ChatGPT answer matches ‘no’ and connect the second arrow to the Stop step – this will leave the post as it is.

![5 1](https://user-images.githubusercontent.com/45091718/226318736-0839fe8e-0062-49a1-906b-36f6330694a8.png)

6. Save the workflow. Now to test the workflow you can publish a new post and you can review the result.

![6](https://user-images.githubusercontent.com/45091718/226318858-10a0bb21-419b-4b17-a6aa-3f646178db53.png)


