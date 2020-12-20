const { formatTimestamp } = require("./date");

test("#format() should correctly format the date", () => {
  const aDate = new Date("2020-01-01T00:00:00") + "";

  const transformedDate = formatTimestamp(aDate);
  const expectedOutput = "Jan 1, 2020";

  expect(transformedDate).toBe(expectedOutput);
});

test("should fail on wrong date to wrong formatted date", () => {
  const aDate = new Date("2020-11-12T00:00:00") + "";

  const transformedDate = formatTimestamp(aDate);
  const expectedOutput = "Jan 1, 2020";

  expect(transformedDate).not.toBe(expectedOutput);
});

test("should throw error on no date passed", () => {
  /**
   * Observations:
   * 1. to call `toThrow`, expect should get a function only, not a value
   * 2. toThrow can have the error message, or an error instance as the input
   */
  expect(() => formatTimestamp()).toThrow("no-timestamp-passed");

  expect(formatTimestamp).toThrow("no-timestamp-passed");

  // This doesn't work, as `formatTimeStamp()` is a value, not a function.
  // Values can't throw errors, only functions can
  // expect(formatTimestamp()).toThrow("no-timestamp-passed");

  expect(formatTimestamp).toThrow(new Error("no-timestamp-passed"));
});
