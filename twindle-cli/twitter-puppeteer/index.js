const puppeteer = require('puppeteer');
const getTweet = async (pageUrl) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(pageUrl, {
    waitUntil: 'networkidle0',
  });
  const tweets = await page.evaluate(() => {
    const tweetNodes = Array.from(
      document.querySelectorAll('div[lang]:not([lang=""])')
    );
    const data = tweetNodes.map((node) => ({
      tweet: node.innerText,
    }));
    return data;
  });
  return { data: tweets };
};
module.exports = { getTweet };
