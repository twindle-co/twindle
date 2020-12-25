const { renderMentionsHashtags } = require("./rich-rendering");
const { fixUserDescription } = require("./rich-rendering");

//1
describe("renderMentionHashtag function working", () => {
  //these are just mock data
  const { mentions, hashtags } = { mentions: [{ username: "abc" }], hashtags: [{ tag: "abc" }] };
  const { text } = { text: "@abc #abc this is cool" };
  test("replace mention and hashtag in text by its url ", () => {
    const response = renderMentionsHashtags({ text, mentions, hashtags });
    expect(response).toBe(
      '<a href="https://twitter.com/abc">@abc</a> <a href="https://twitter.com/hashtag/abc">#abc</a> this is cool'
    );
  });

  test("replace mention by mention url", () => {
    const response = renderMentionsHashtags({ text, mentions });
    expect(response).toBe('<a href="https://twitter.com/abc">@abc</a> #abc this is cool');
  });

  test("replace tag by tag url", () => {
    const response = renderMentionsHashtags({ text, hashtags });
    expect(response).toBe('@abc <a href="https://twitter.com/hashtag/abc">#abc</a> this is cool');
  });

  test("expect only text no replcement", () => {
    const response = renderMentionsHashtags({ text });
    expect(response).toBe("@abc #abc this is cool");
  });
});

//2

describe("fixuserDescription function working", () => {
  test("expecting a transformed description", () => {
    //mockuser data
    const mockUser = {
      description: "I'm loving it! : https://t.co/7Ct2VXMx64",
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
    };
    let response = fixUserDescription(mockUser);
    expect(response.description).toEqual(
      `I'm loving it! : <a href="https://ThreadReaderApp.com" class="description-link" rel="noopener noreferrer">ThreadReaderApp.com</a>`
    );
  });

  test("twimoji working", () => {
    const mockUser = {
      description: "I'm loving it! 😀",
      entities: {},
    };
    const response = fixUserDescription(mockUser);
    expect(response.description).toContain("emoji");
  });
});
