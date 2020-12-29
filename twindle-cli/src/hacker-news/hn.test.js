const { getUser } = require("./code");

//1
test("fetch function is returning json", async () => {
  const data = await getUser("pg");
  expect(data).toMatchObject(/{}/);
});

//2
test("tested for fetch error ", async () => {
  try {
    await getUser("pg");
  } catch (e) {
    expect(e).toEqual({
      error: "User with pg not found.",
    });
  }
});
