Making REST Calls to  Twitter Endpoints - output being written to the console right now

Code Structure: playground -> cli -> a new folder called twitter-api has been included
This is a NodeJS module but except for node-fetch no other module has been used
There are three scripts:

> script-version2-conversation.js: Contains hard-coded Twitter Endpoints for version 2. Process - using a sample Tweet URL, extract the tweet id and twitter handle name, make a Tweet lookup call to get the first tweet's details and particularly the conversationId. If the first tweet is older than 7 days I am logging an error - then make a second call to get the tweets on the conversation using the conversationId but also made by the same user(this will exclude replies) - from the response, find the direct replies one by one

> script-version1-usertimeline.js: Contains hard coded Twitter Endpoints for getting the user's Twitter timeline. Process - using a sample Tweet URL, extract the tweet id and twitter handle name, make a Tweet lookup call to get the first tweet's details. If the first tweet is older than 7 days I am logging an error. Since there is no way to track a particular conversation's thread(no conversationId), we hit the user timeline endpoint and ask for all tweets made by the user since the first tweet. Now from the response, we filter with a field called in_reply_to_id_str pointing to the parent tweet. Thus we construct the chain of responses. Caveat: Only 200 max tweets can be returned and so all replies are not guaranteed - particularly if the user is super active.

> script-version1-searchendpoint.js: Contains hard coded Twitter Search Endpoints. Process - using a sample Tweet URL, extract the tweet id and twitter handle name, make a Tweet lookup call to get the first tweet's details. If the first tweet is older than 7 days I am logging an error. Since there is no way to track a particular conversation's thread(no conversationId), we hit the search endpoint by constructing a standard query using the operators from:twitterHandle+to:twitterHandle - this will only return replies made by the user to himself - from the response we filter with a field called in_reply_to_id_str pointing to the parent tweet. Thus we construct the chain of responses. Caveat: Only 200 max tweets can be returned and so all replies are not guaranteed - particularly if the user is super active.

Standard responses from the Twitter endpoints have also been saved under the folder responses - includes all tweet fields - so we can use whatever field is needed in the output file.

Things to do to test the scripts:

> Please remove <Auth_Token_Here> at the top of the script files and replace with the Auth Header Token provided by the twitter API

> I have used a sample Tweet that was made at the time of testing the script - please pick a recent tweet and replace SAMPLE_TWEET with that tweet. 

> The function getTweets(SAMPLE_TWEET) is being called - and that is the starting point of execution

I am not an expert in Javascript coding - so any issues including coding styles and standards can be raised on this PR. Thank @UnevenCoder for his inputs in writing this.



## Attach Screenshot:
![screenshot](https://user-images.githubusercontent.com/64691316/97374048-62d69080-18dd-11eb-9884-194bd9c02d9a.png)



> Note 2 code reviewer approval needed. Approach in twitter group & discord channel.
