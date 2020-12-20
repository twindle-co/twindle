const { extractScreenName, getTweetArray } = require("./helpers");

describe("extractScreenName()", () => {
  test("should extract screenName correctly", () => {
    expect(extractScreenName("https://twitter.com/realDonaldTrump")).toBe("realDonaldTrump");
  });

  test("should not be able to extract screen name", () => {
    expect(extractScreenName("realDonaldTrump")).toBeUndefined();
  });
});

describe("#getTweetArray()", () => {
  test("should pass if nothing is passed", () => {
    expect(getTweetArray()).toEqual([]);
    expect(getTweetArray({ data: [] })).toEqual([]);
  });

  test("should pass with bare minimum data", () => {
    const response = {
      data: [],
      includes: {
        media: [],
        users: [],
      },
    };

    expect(getTweetArray(response)).toEqual([]);
  });

  test("should pass with bare minimum data #2", () => {
    const response = {
      data: [
        {
          conversation_id: "1323545207510630400",
        },
      ],
      includes: {
        media: [],
        users: [],
      },
    };

    expect(getTweetArray(response)).toEqual([
      {
        conversation_id: "1323545207510630400",
        includes: {
          media: [],
          users: [],
        },
      },
    ]);
  });

  test("should  have includes", () => {
    const response = {
      data: [
        {
          conversation_id: "1323545207510630400",
        },
      ],
    };

    expect(getTweetArray(response)).toEqual([
      {
        conversation_id: "1323545207510630400",
        includes: undefined,
      },
    ]);
  });
});

// ['twitter.com', 'username', 'sdvhjcvd', '/']
