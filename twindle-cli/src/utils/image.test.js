const { encodeImage } = require("./image");

describe("using mock url to test encoding function", () => {
  test("correct response", async () => {
    //this is to test that function is responding
    const response = await encodeImage("https://google.com");
    expect(response).toMatch(/^(data:image)/);
  });

  test("undefined response when no url passed", async () => {
    await expect(() => encodeImage()).rejects.toThrow(Error);
  });
});
