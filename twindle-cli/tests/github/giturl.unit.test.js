const { validateGithubURL } = require("../../src/cli");

const mockURL = "https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/README.html";

test("verify github url extension", async () => {
  await expect(() => validateGithubURL(mockURL)).rejects.toThrow(Error);
});
