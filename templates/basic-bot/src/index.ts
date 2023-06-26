import { Evogram } from 'evogram';
import * as dotenv from 'dotenv';
import "./commands";

// Load environment variables from .env file
dotenv.config();

// Check if the API token is provided in the environment variables
if(!process.env.TOKEN) throw new Error("API token not found in environment variables.");

// Authorize the bot using the API token
const client = new Evogram(process.env.TOKEN);

// Start the bot with LongPoll
client.updates.polling.start();