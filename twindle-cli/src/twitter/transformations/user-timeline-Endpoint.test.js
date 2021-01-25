const { processUserTweets } = require("./user-timeline-endpoint");

describe("testing functionality of user timeline", () => {
  const responseJSON = {
    //1
    //mock data
    data: [
      {
        conversation_id: "123",
        id: "123",
        text: "lorem ipsum ",
        attachments: {},
        author_id: "25472458",
        created_at: "2020-12-28T10:50:45.000Z",
      },
    ],
    includes: {
      media: [],
      users: [
        {
          description: "Rotterdam School of Management",
          username: "abc",
          url: "http://t.co/6Uiy3qfoiW",
          id: "25472458",
          created_at: "2009-03-20T06:38:54.000Z",
          profile_image_url:
            "https://pbs.twimg.com/profile_images/1034856145167503360/fhRoau55_normal.jpg",
          name: "RSM",
        },
      ],
    },
  };

  const userName = "abc";

  test("this should process user Tweet", async () => {
    const response = await processUserTweets(userName, responseJSON, "");
    expect(response).toMatchObject({
      common: {
        user: {
          id: "25472458",
          username: "@abc",
          profile_image_url:
            "https://pbs.twimg.com/profile_images/1034856145167503360/fhRoau55.jpg",
        },
        count: 1,
      },
      data: [
        {
          id: "123",
          tweet: "lorem ipsum ",
        },
      ],
    });
  });

  //2
  test("this make sure its user timeline", async () => {
    const response = await processUserTweets(userName, responseJSON, "");
    expect(response).toHaveProperty("common.created_at");
  });
});
