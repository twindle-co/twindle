const { formatTimestamp } = require("../../src/twitter/utils/date");

describe("utils module", () => {
  describe("date module", () => {
    it("#format() should correctly format the date", () => {
      const aDate = new Date("2020-01-01T00:00:00");
      const transformedDate = formatTimestamp(aDate);
      const expectedOutput = "Jan 1, 2020";
      expect(transformedDate).toEqual(expectedOutput);
    });
  });
});
