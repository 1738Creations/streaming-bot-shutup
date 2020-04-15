// For connecting to Twitch
const tmi = require('tmi.js');

// Any username matching these has their message removed
var PartialMatchArray = [
	'something',
	'inhere'
]

// Any username partially matching these has their message removed
var PartialWeightedMatchArray = [
	'chin',
	'bot'
]

// When iterating through the weighted array, this number of matches must be met before a message is deleted
var WeightedMatch = 2;

// The channel name to connect to
var ChannelName = <replace_me>; // Name of channel to join, example: 'channel_name'


// Twitch
// Define configuration options
const opts = {
	identity: {
		username: <replace_me>, // Name of the bot account, example: username: 'accountname'
		password: <replace_me> // Auth token of the bot account, example: password: 'oauth:4seeee33535ewer35tewrw334'
	},
	channels: [
		ChannelName
	]
}

// Twitch
// Create a client with our options
const client = new tmi.client(opts);

// Twitch
// Register our event handlers (defined below)
client.on('connected', onConnectedHandler);
client.on('message', onMessageHandler);

// Twitch
// Connect the bot to Twitch
client.connect();


// No Twitch functions below this lineHeight
// ------------------------------------


// This event is fired whenever you receive a chat, action or whisper message
// Trump bot only cares about whispers
// We could expand this to only listen to whispers from the host by checking for the username in 'msg'
function onMessageHandler (channel, userstate, msg, self) {
	
	// Ignore messages from the bot
	if (self) { return; }

	// Check for different types of messages
    switch(userstate["message-type"]) {
        case "action":
            // This is an action message... we don't need it
            break;
			
        case "chat":
			// Store the name and ID of the client who said something
			var NameToCheck = userstate['display-name'].toLowerCase();
			var MessageID = userstate['id'];

			// How many matches were founded in name
			var MatchesCounted = 0;
			
			// Set the clear message option
			var ClearMessage = false;

			// Look for the partial array for username matches
			for (let NameInArray of PartialMatchArray) {
				var test = NameInArray.toString().toLowerCase();
				if (NameToCheck.includes(test) == true)
				{
					ClearMessage = true;
					break;
				}
			}
			if (ClearMessage == false)
			{
				for (let NameInArray of PartialWeightedMatchArray) {
					var test = NameInArray.toString().toLowerCase();
					if (NameToCheck.includes(test) == true)
					{
						MatchesCounted += 1;
						if (MatchesCounted == WeightedMatch) {
							ClearMessage = true;
							break;
						}
					}
				}
			}
			
			if (ClearMessage == true)
			{
				client.deletemessage(ChannelName, MessageID)
				.then((data) => {
					// Log the username of deleted message in console
					console.log('Message deleted from: ' + NameToCheck);
					
					// Can show message, don't know why you'd want to...
					//console.log('Message: ' + msg);
				}).catch((err) => {
					console.log(err);
				});
			}

            break;
			
        case "whisper":
            // This is an whisper... we don't need it
            break;
			
        default:
            // Should never get here
			console.log('Should never get here');
            break;
    }

}


// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
	console.log("Connected to " + addr + ", port: " + port);
}