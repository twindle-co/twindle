const { constructObjectArray } = require("./code");
const Renderer = require("./renderer");

async function news(keyword) {
  const data = await constructObjectArray(`${keyword}`);
  const outputFilePath = `${__dirname}/news.pdf`;
  await Renderer.render(data, outputFilePath);
  console.log(`your pdf saved to ${outputFilePath}`);
}
news("medicine");
