const { processReplies } = require("./tweets-array-endpoint");
const { processTweetsArray } = require("./tweets-array-endpoint");

describe("testing functionality of processeplies() functiion ", () => {
  test("this will test if the function return array of replies", async () => {
    //this is mock data
    const data = [
      //first tweet
      {
        conversation_id: "123",
        entities: {},
        author_id: "000",
        id: "123",
      },
      {
        //indirect reply fulfils all conditions
        conversation_id: "123",
        entities: {},
        author_id: "000",
        in_reply_to_user_id: "111",
        source: "ThreadReaderApp",
        id: "456",

        referenced_tweets: [
          {
            type: "replied_to",
            id: "789",
          },
        ],
      },
    ];

    const response = await processReplies({ data });
    expect(response).toMatchObject([
      {
        id: "789",
        answer: {
          id: "456",
          tweet: "",
        },
      },
    ]);
  });
});

//2

describe("testing functionality of processTweetsArray() function", () => {
  test("function working and processing Tweets", async () => {
    const response = {
      data: [
        //first tweet
        {
          created_at: "2018-10-23T23:30:56.000Z",
          text: "lorem ipsum",
          entities: {
            description: {
              urls: [
                {
                  url: "https://t.co/7Ct2VXMx64",
                  expanded_url: "https://ThreadReaderApp.com",
                  display_url: "ThreadReaderApp.com",
                },
              ],
            },
          },
          id: "123",
          conversation_id: "123",
          author_id: "895814938995957760",
        },
        //this is reply or another tweet
        {
          created_at: "2018-10-23T23:30:59.000Z",
          author_id: "895814938995957760",
          conversation_id: "123",

          entities: {
            description: {
              urls: [
                {
                  url: "https://t.co/7Ct2VXMx64",
                  expanded_url: "https://ThreadReaderApp.com",
                  display_url: "ThreadReaderApp.com",
                },
              ],
            },
          },

          id: "1054877880033861632",
          in_reply_to_user_id: "895814938995957760",
          text: "One or two minutes later.",
          referenced_tweets: [
            {
              type: "replied_to",
              id: "1054877877462659072",
            },
          ],
        },
      ],
      includes: {
        media: [],
        users: [
          {
            created_at: "2017-08-11T01:11:39.000Z",
            id: "895814938995957760",
            pinned_tweet_id: "934543319962546176",
            profile_image_url:
              "https://pbs.twimg.com/profile_images/936421015067824134/g_PfzHXA_normal.jpg",
            description: "I'm a 🤖 to help you read threads more easily. 😀",
            entities: {},
          },
        ],
      },
    };

    const result = await processTweetsArray(response);
    expect(result).toMatchObject({
      data: [{ id: "123", tweet: "lorem ipsum" }],
      common: { created_at: "Oct 23, 2018", user: {}, count: 1 },
    });
  });
});
