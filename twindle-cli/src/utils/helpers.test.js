const { isValidEmail } = require("./helpers");

test("Should match email format #1", () => {
  expect(isValidEmail("valid-email@email.com")).toBe(true);
  expect(isValidEmail("valid+x@gmail.com")).toBe(true);
  expect(isValidEmail("v@g.com")).toBe(true);
});

test("Should be false if email is empty", () => {
  expect(isValidEmail("valid-email@.com")).toBe(false);
  expect(isValidEmail("")).toBe(false);
  expect(isValidEmail(null)).toBe(false);
});
