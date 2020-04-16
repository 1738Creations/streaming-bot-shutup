Streaming Bot - Shutup (in progress)
======================
A way to combat users harassing streamers with usernames.

We can ban words instream chat. We can ban users in stream chat. We can't ban usernames. 'Offensive' usernames should be handled by the streaming platform at creation, however personal insults and harassment can't be. Advertising bots usually follow a username pattern too, so it's handy for clearing them out.

Randomly banning people automatically isn't a good idea. So we can't stop people coming in to the stream, but we can shut them up. This script will immediately delete the message from anyone who's username matches one of 2 arrays. It's a very small script which should be easy enough to follow and modify as required. Whenever a message is deleted, the username is logged to the console. The message deleted can be logged to the console, but... why would you want to see it?

This is only configured for partial matches. Although if you make a partial match as someone's exact username it will obviously kill their messages!


LEGAL STUFF:
============
You do not have permission to use or modify any of the content in this reprository if...

...you are an e-beggar, tit streamer or someone who can't be bothered to try at real job and provide some worth to society. If you're the kind of person who is featured on the Mixer homepage then this is not for you. If you spend your time in the 'just chatting' portion of Twitch or have a pre-stream, this is not for you.

If in doubt, mail me with a link to verify your societal status.

If this breaks something or you get banned for using it, that's your problem not mine.


REQUIREMENTS:
=============
Each scripts is intended to run from an account, either Twitch or Mixer. You can create a new account or use your host account. ASs this script doesn't have any interaction with chat, there's no reason to not run it from the hosts account.

Scripts can be run from any machine. They don't need to be on the hosting computer and should work on Windows or Linux as they're Node.js scripts.


MIXER:
======
Haven't finished the Mixer version yet.


TWITCH:
=======
It's assumed users have followed the installation on the dev sites...
Ref: https://dev.mixer.com/guides/chat/introduction


Search the script for '<replace_me>' and replace the details as they're found:

- username: <replace_me>
-- Name of the bot account

- password: <replace_me>
-- When logged in to the Twitch bot account, go to this page and connect:
--- https://twitchapps.com/tmi/
-- The entire string: 'oauth:oauth:jnmki23o9278h4kjhe9w843vew9ewaa7'

- channels: [ <replace_me> ]
-- Name of the channel to join as it appears in a browser such as: https://www.mixer.com/replace_me


Run the script: node shutup_twitch.js
- Wait for someone with a restricted name to chat!


CONFIGURATION:
==============
Hopefully the comments in the code make some sense.

There are 2 arrays and a variable which need to be customised:
- PartialMatchArray (array)
  - Names will be matched against any single item in this array
- PartialWeightedMatchArray (array)
  - This has 2 items; an array and a number
  - Array
    - This is a list of partial strings we want to match
  - Integer
    - This is the number of matches the strings in this array index must match
    - For instance: [['this', 'isa' 'test'], 2]
    - ...would need to match 2 of these 3 strings in a username


LIVE DEMO:
==========
Available on request. I have a Mixer and Twitch demo channel used for developing and testing stream tools:
- https://mixer.com/1738_Creations
- https://www.twitch.tv/1738_creations

...the bots only run when I stream. If you'd like a demo then send a request (1738creations@gmail.com) with the stream name and I'll set them up.



======================

Shout out Sean Ranklin

Pig-ups Liquid Richard.


Covid19 isn't a threat. The numbers don't lie, people do. Stop using social media and supporting mainstream fake news. The WHO are corrupt.
