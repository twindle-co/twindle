const { getHtml } = require("../../src/github/githubparse/app");

const mockURL = "https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch1.md";

test("fetch function return repo details in json", async () => {
  const data = await getHtml(mockURL);
  expect(data).toMatchObject(/{}/);
});
