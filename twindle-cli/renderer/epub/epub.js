const renderTemplate = require("/render-template");
const Epub = require("epub-gen");

const createOptions = (title, author, html) => ({
    title,
    author, 
    content: [
      {
        title: "Twindle Thread",
        data: html,
      },
    ],
});
 
    async function createEpub(mockData, outputPath) {
        const htmlContent = await renderTemplate({ thread: mockData.data}, "Thread");
        const options = createOptions("nano", "nano", htmlContent);

	
        const book = new Epub(options, outputPath);
        await book;
    }

    module.exports = createEpub; 