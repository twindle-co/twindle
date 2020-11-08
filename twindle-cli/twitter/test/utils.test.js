const { format } = require("../utils/date");

describe("utils module", () => {
  describe("date module", () => {
    // not sure if this is even doing much, @puru fix it if needed
    it("format() should correctly format the date", () => {
      const aDate = new Date("2020-01-01T00:00:00");
      const transformedDate = format(aDate, "MMM d, yyyy  h:mm aaaa");
      const expectedOutput = "Jan 1, 2020  12:00 a.m.";
      expect(transformedDate).toEqual(expectedOutput);
    });
  });
});
