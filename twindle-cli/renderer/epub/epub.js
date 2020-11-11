const renderTemplate = require("/render-template");
const Epub = require("epub-gen");

<<<<<<< HEAD
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
=======
const options = {
  title: "The Hello World",
  author: "Hello MacWorld",
  content: [
    {
      title: "Chapter 1: First Hello",
      data: `<p>
       Lorem Ipsum dolor sit amet, consectetur adipsicing elite. Got it? Neither did we. In the publishing and design industries, “lorem ipsum” is used as dummy text in visual designs. Using placeholder copy like this helps designers and clients alike focus on layout, imagery, typography, and design rather than on the actual wording of content.

       Dummy copy is great, but what’s with all the Latin? Turns out, the original Lorem Ipsum comes from bits and pieces of Cicero’s De Finibus bonorum et Malorum (On the Ends of Goods and Evils).
       </p>`,
    },
  ],
};

function generateEpub(directory) {
  return new epub(options, directory);
}

module.exports = { generateEpub };
>>>>>>> c63dec9cc972509d61b47c5cd16c16f2b4f8ed79
