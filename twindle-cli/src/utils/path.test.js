const { getOutputFilePath } = require("./path");

describe("testing for correct output file path", () => {
  test("is path valid", () => {
    const response = getOutputFilePath("path/of/file.pdf", "pdf");
    expect(response).toMatch(/.+\.pdf$/);
  });

  test("no path and format provided", () => {
    expect(() => getOutputFilePath()).toThrow(Error);
  });
});
