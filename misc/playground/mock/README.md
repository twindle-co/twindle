# mock

Here is the test thread link https://twitter.com/johnjacobkenny/status/1320972620817260544

Here is the code for the endpoint which fetches the first tweet data. Response is in `./twitter-tweet-api-response.json`

```javascript
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer <enter key here>");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch(
  "https://api.twitter.com/2/tweets/1320972620817260544?tweet.fields=author_id,created_at,entities,geo,id,in_reply_to_user_id,text,conversation_id,referenced_tweets&expansions=author_id,in_reply_to_user_id,referenced_tweets.id&user.fields=name,username",
  requestOptions
)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
```

Here is the code for the endpoint which fetches the conversation tweet data. Response is in `twitter-recent-search-api-response.json`

```javascript
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer <enter key here>");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch(
  "https://api.twitter.com/2/tweets/search/recent?tweet.fields=author_id,created_at,entities,geo,id,in_reply_to_user_id,text,conversation_id,referenced_tweets&expansions=author_id,in_reply_to_user_id,referenced_tweets.id&query=conversation_id:1320972620817260544",
  requestOptions
)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
```
