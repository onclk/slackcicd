// const { WebClient } = require('@slack/web-api');
// const { createEventAdapter } = require('@slack/events-api');

// // create slack events
// const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
// const slackToken = process.env.SLACK_TOKEN; 
// const port = process.env.SLACK_PORT || 8000;

// const slackEvents = createEventAdapter(slackSigningSecret);
// const slackClient = new WebClient(slackToken);

// // type of the message and function
// slackEvents.on('app_mention', (event) => {
//     console.log(`Got message from user ${event.user}: ${event.text}`); 
//     (async () => {
//         try {
//            await slackClient.chat.postMessage({ channel: event.channel, text: `Hello <@${event.user}>! :tada:` })
//         }catch (error){
//             console.log(error.data)
//         }
//     })();
// })

// slackEvents.on('error', console.error);

// slackEvents.start(port).then(() => {
//     console.log(`Server started on port ${port}`)
// })

// const psi = require('psi');

// (async () => {
//   // Get the PageSpeed Insights report
//   const { data } = await psi('https://google.com');
//   console.log('Speed score:', data.lighthouseResult.categories.performance.score);

//   // Output a formatted report to the terminal
//   await psi.output('https://google.com');
//   console.log('Done');

//   // Supply options to PSI and get back speed
//   const data2 = await psi('https://google.com', {
//     nokey: 'true',
//     strategy: 'desktop'
//   });
//   console.log('Speed score:', data2.data.lighthouseResult.categories.performance.score);
// })();

const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const requireDir = require('require-dir')



// Initialize app
const app = express()

// Parser for POST data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Set Routes
const routes = requireDir('./routes')
for(var i in routes) {
	app.use('/', routes[i])
}

// Set port
const port = process.env.PORT || '3002'
app.set('port', port)


// Create http server
const server = http.createServer(app)

// Listen for traffic
server.listen(port, () => console.log(`App running on port: ${port}`))