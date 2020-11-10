const epub = require("epub-gen");

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
