const { extractScreenName } = require("../../../../src/twitter/transformations/helpers");

describe("twitter |> transformations |> helpers module", () => {
  describe("#extractScreenName()", () => {
    test.each([
      ["https://twitter.com/denvercoder/status/1328241810045607937", "denvercoder"],
      ["https://twitter.com/denvercoder/status/1328241810045607937?s=20", "denvercoder"],
      ["twitter.com/piccalilli_/status/1327887093826277382", "piccalilli_"],
    ])("extracts username from URL", (input, output) => {
      expect(extractScreenName(input)).toBe(output);
    });
  });

  describe("#getTweetObject()", () => {});
});
