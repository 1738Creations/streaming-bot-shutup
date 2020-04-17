// For connecting to Mixer
const Mixer = require('@mixer/client-node');
const ws = require('ws');

// Any username matching these has their message removed
var PartialMatchArray = [
	'something',
	'inhere'
]

// Any username partially matching these has their message removed
var PartialWeightedMatchArray = [
	[['1738', 'on', 'test'], 2],
	[['this', 'isa', 'test'], 3],
]

// The channel name to connect to
//var ChannelName = <replace_me>; // Name of channel to join, example: 'channel_name'


// Mixer
// Instantiate a new Mixer Client
// See the Mixer documentation for anything related to their system
// https://dev.mixer.com/
const client = new Mixer.Client(new Mixer.DefaultRequestRunner());

client.use(new Mixer.OAuthProvider(client, {
    tokens: {
        access: <replace_me>, // access: 'xxxj2kdl2j5er4il2rhew3i43lrhlwe423423',
        // Tokens retrieved via this page last for 1 year.
        expires: Date.now() + (365 * 24 * 60 * 60 * 1000)
    },
}));

// Mixer
// Joins the bot to chat
async function joinChat(userId, channelId) {
    const joinInformation = await getConnectionInformation(channelId);
    const socket = new Mixer.Socket(ws, joinInformation.endpoints).boot();

    return socket.auth(channelId, userId, joinInformation.authkey).then(() => socket);
}

// Mixer
// Returns body response of bot joining chat
async function getConnectionInformation(channelId) {
    return new Mixer.ChatService(client).join(channelId).then(response => response.body);
}

// Mixer
// ...gets details about users in chat
async function getUserInfo() {
    return client.request('GET', 'users/current').then(response => response.body);
}


// No Mixer functions below this lineHeight
// ------------------------------------


// Start the bot / join it to chat
getUserInfo().then(async userInfo => {
	// The ID of the channel  to join specific channel and verify users messaging the bot are in this channel
	const targetChannelID = <replace_me>; // example: targetChannelID = 123456789

	// Joins the bot to the channel
	const socket = await joinChat(userInfo.id, targetChannelID);
	
    // Looks for any chat message (main chat, whispers...)
	// For this game we don't care if people spam main chat with the command, if we did we'd force the bot to only listen for whispers
	// -- data.message.meta[0].whisper == true)
	// -- https://dev.mixer.com/reference/chat/events/chatmessage
    socket.on('ChatMessage', data => {

		// Verify the users are in our channel.
		// We don't want people whispering from another channel, silently ignore them
		if (data.channel == targetChannelID){
		
			// If the message has contents we can read
			if (data.message.message[0].data)
			{
				// Store the name and ID of the client who said something
				var NameToCheck = data.user_name.toLowerCase();
				var MessageID = TheMessage = data.id;

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
					// Iterate through the array of words from the current index
					for (let SubArray of PartialWeightedMatchArray)
					{
						// We will check the number below (from primary array) against text items from this array
						var WordsInArrayToCheck =  SubArray[0];

						// When iterating through the weighted array, this number of matches must be met before a message is deleted
						var WeightedMatch = SubArray[1];

						// Iterate through each word in the words array
						for (let NameInArray of WordsInArrayToCheck)
						{
							// This is the text to verify
							var SingleText = NameInArray.toString().toLowerCase();
							if (NameToCheck.includes(SingleText) == true)
							{
								MatchesCounted += 1;
								if (MatchesCounted == WeightedMatch) {
									ClearMessage = true;
									break;
								}
							}
						}
						
						// Break the outer loop if we need to delete a message
						if (ClearMessage == true)
							{
								break;
							}
					}
				}
				
				if (ClearMessage == true)
				{
					// Log username to console
					console.log("Deleted message by: " + NameToCheck);
					
					// We could log the message to chat, don't know why we'd want to...
					//console.log(data.message.message[0].text);

					// Delete the message
					socket.call('deleteMessage', [TheMessage]);
				}
			}

		}
	});

    // Handle errors
    socket.on('error', error => {
        console.error('Socket error');
        console.error(error);
    });
});