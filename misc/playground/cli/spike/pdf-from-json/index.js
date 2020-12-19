// can import this from json
const data = [
  {
    name: 'Naval',
    twitterHandle: 'naval',
    image:
      'https://pbs.twimg.com/profile_images/1256841238298292232/ycqwaMI2_400x400.jpg',
    createAt: '2018-05-31',
    tweet: 'How to Get Rich (without getting lucky):'
  }
];

// setting available fonts
const fonts = {
  Courier: {
    normal: 'Courier',
    bold: 'Courier-Bold',
    italics: 'Courier-Oblique',
    bolditalics: 'Courier-BoldOblique'
  },
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique'
  },
  Times: {
    normal: 'Times-Roman',
    bold: 'Times-Bold',
    italics: 'Times-Italic',
    bolditalics: 'Times-BoldItalic'
  },
  Symbol: {
    normal: 'Symbol'
  },
  ZapfDingbats: {
    normal: 'ZapfDingbats'
  }
};

const PdfPrinter = require('pdfmake');
const printer = new PdfPrinter(fonts);
const fs = require('fs');

// document
const docDefinition = {
  content: [
    {
      columns: [{ text: 'Name: ', bold: true }, data[0].name]
    },
    {
      columns: [
        { text: 'Twitter Handle: ', bold: true },
        `@${data[0].twitterHandle}`
      ]
    },
    {
      columns: [{ text: 'Tweet: ', bold: true }, data[0].tweet]
    }
  ],
  image: data[0].image,
  defaultStyle: {
    font: 'Helvetica'
  }
};

const pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream('./tweet.pdf'));
pdfDoc.end();

// console.log(data);
