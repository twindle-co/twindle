const puppeteer = require("puppeteer");
const { waitFor } = require("../utils/helpers");

/**
 * Get tweets(even older than 7 days) using puppeteer
 * @param {string} tweetID
 */
const getTweetIDs = async (tweetID) => {
  const pageURL = `https://twitter.com/anyone/status/${tweetID}`;

  // Modify this variable to control the size of viewport
  const factor = 0.2;
  const height = Math.floor(2000 / factor);
  const width = Math.floor(1700 / factor);

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width,
      height,
    },
    args: [`--force-device-scale-factor=${factor}`, `--window-size=${width},${height}`],
  });

  const context = browser.defaultBrowserContext();
  context.clearPermissionOverrides();
  context.overridePermissions("https://twitter.com", ["clipboard-read", "clipboard-write"]);

  const page = await browser.newPage();

  await page.goto(pageURL, {
    waitUntil: "networkidle2",
  });

  await waitFor(4000);

  // page.on("popup", (e) => console.log(e));

  // await page.waitForNavigation({ waitUntil: "domcontentloaded" });

  const session = await page.target().createCDPSession();
  await session.send("Emulation.setPageScaleFactor", {
    pageScaleFactor: 0.5, // 400%
  });

  // await page.exposeFunction("clipboardyRead", clipboardy.read);

  const tweetIDs = await page.evaluate(async () => {
    const ids = [];

    /**
     * Wait for `ms` amount of milliseconds
     * @param {number} ms
     */
    const waitFor = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const tweetNodes = Array.from(document.querySelectorAll('div[lang]:not([lang=""])'));

    const tweetContainers = tweetNodes.map(
      (node) => node.parentElement.parentElement.parentElement
    );

    for (let tweetContainer of tweetContainers) {
      const shareButtonToCLick = tweetContainer.querySelector('[aria-label="Share Tweet"]');

      // Click it
      try {
        shareButtonToCLick.click();
      } catch {
        shareButtonToCLick.children[0].click();
      }

      // Wait for buttons to show
      await waitFor(100);

      const copyLinkItem = [...document.querySelectorAll('[role="menuitem"]')].reverse()[0];

      // Click
      copyLinkItem.click();

      await waitFor(30);

      const url = await navigator.clipboard.readText();

      const tweetID = url.replace("?s=20", "").split("/").reverse()[0];

      ids.push(tweetID);
    }

    return ids;
  });

  await browser.close();

  return tweetIDs;
};

module.exports = { getTweetIDs };
