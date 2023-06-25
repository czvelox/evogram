![logo](https://i.imgur.com/saKG5ap.jpg)

# Introduction
*Welcome to the Evogram Telegram Framework! This framework provides an easy and convenient way to build Telegram bots in Node.js. In this guide, we will walk you through the steps to download Node.js, create a Telegram bot, and install the Evogram package.*

# Documentation
See https://czvelox.github.io/evogram

# Downloading Node.js
The first step is to download and install Node.js. You can download the latest version of Node.js from the official website at https://nodejs.org. Simply select the version you wish to download and follow the instructions to install it on your machine.

# Creating a Telegram Bot
To create a Telegram bot, you will need to talk to [BotFather](https://t.me/botfather), a bot provided by Telegram that helps you create and manage bots. To do this, simply open a chat with [BotFather](https://t.me/botfather) in Telegram and follow the steps outlined by the bot. Once you have created a bot, you will receive an API token that you will need to use in your code.

# Installing Evogram
To install the Evogram package, you can use npm, the package manager for Node.js. Simply run the following command in your terminal:
```shell
npm install evogram
```

## Writing Code
Once you have installed the Evogram package, you can start writing code to build your bot. Here is an example of a simple bot using Evogram:
```js
const { Evogram } = require('evogram');
const client = new Evogram("YOUR_TOKEN");

client.updates.on("message", (message) => {
    message.send(message.text || "Sorry, I can only repeat the text.");
});

client.updates.polling.start();
```

*In the code above, we use the Evogram constructor to create a new instance of the bot, passing in the API token. Then we define a message event handler to reply to any text message received with the same text. Finally, we launch the bot using the `client.updates.polling.start()` method.*

# Conclusion
The framework is constantly being developed and updated with new features, so stay tuned for more updates in the future. Whether you are just starting out or have extensive experience with Telegram bots, Evogram provides a simple and effective solution for building and deploying your bots.