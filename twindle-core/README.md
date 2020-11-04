# Twitter API Integration code live in this folder

> Building a nodejs module from scripts that fetched tweet information from Twitter API
> This project focuses on the version 2.0 of Twitter API

1. index.js - contains the starting function of this project getTweets(tweet_url)
2. main.js - shows an example tweet calling main.getTweets
3. Scripts to fetch tweets from other ways of Twitter API version 1.1 are available under misc folder
4. Sample twitter API responses in twitter_responses folder

## Input:

-   Inside the index.js file, replace the example tweet with a more recent tweet(in the last seven days) else no tweets will be obtained from Twitter
-   Inside the ../example.env file to ../.env in the root of twindle-cli, set the bearer token obtained from Twitter to TWITTER_AUTH_TOKEN in the .env file.

\*index.js can be run using the command
node index.js

**Output:**
Tweets obtained are written in output/twitter-api-response.json file

##Things left to do:

-Handling error scenarios - >Timeout Errors, 400/401 Authorization issues, Older than 7 days tweet issues
-Migrate to ES6 - code looks cluttered with require and module.exports syntax - would be better to use import and export keywords
-Need to check if newer tweets are available - to update the thread??
