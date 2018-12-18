# Messanger app using React and Chatkit

Created with React and Pusher Chatkit

# Getting started

Clone the repo:
`git clone https://github.com/lfirebrand/lexi-chat.git`

Install project dependencies:
`cd lexi-chat && npm install`

Go to [https://pusher.com/chatkit](Pusher.com/chatkit) to sign up for a new account. Go to Chatkit, then Instances and hit Create to create a new Chatkit instance. Take note of the unique instanceLocator and secretKey. 

# Update project with unique Chatkit credentials:

Open `server.js` and update the `instanceLocator` and `secretKey` with your unique credentials. Do the same in the `Chat.js` file.

# Create a User
Go back to [https://pusher.com/chatkit](Pusher.com/chatkit) to the Instance Inspector and create a new User.

# Enable the Test Token Provider
Used only for testing purposes, this allows Pusher's servers to generate a token. This authenticates Users so they can use Chatkit.

# Create a Room
Go back to Instance Inspector and click on Rooms and click Create New Room under your desired User. Take note of the roomId. Open up `chat.js` and update the roomId instance.

Start the dev server:
`npm start`

Start the Node server:
`node server`

# Followup

It took me approximately 1.5 hours to create this project. I decided to use the Chatkit library to enhance create a light-weight, full-functioning chat app that is scalable with a lot of features. The challenges were understanding the nuances of the particular library. I spent a lot of time digging through the documentation and look and implementations on GitHub. If I had more time, I would add in a component to show who is online at any given moment and components to allow users to select rooms. I would also add more functionality to take this from a testing to a dev application.

# Built with
* Pusher Chatkit
* React
