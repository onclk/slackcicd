const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');

// create slack events
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackToken = process.env.SLACK_TOKEN; 
console.log(slackToken)
const port = process.env.SLACK_PORT || 4000;

const slackEvents = createEventAdapter(slackSigningSecret);
const slackClient = new WebClient(slackToken);

// type of the message and function
slackEvents.on('app_mention', (event) => {
    console.log(`Got message from user ${event.user}: ${event.text}`); 
    (async () => {
        try {
           await slackClient.chat.postMessage({ channel: event.channel, text: `Hello <@${event.user}>! :tada:` })
        }catch (error){
            console.log(error.data)
        }
    })();
})

slackEvents.on('error', console.error);

slackEvents.start(port).then(() => {
    console.log(`Server started on port ${port}`)
})