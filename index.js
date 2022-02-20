const fs = require("fs");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");

const createPDF = async () => {
  const pdfDoc = await PDFDocument.create();

  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  const page = pdfDoc.addPage();

  const text = "This is text in an embedded font!";
  const textSize = 35;
  //   const textWidth = customFont.widthOfTextAtSize(text, textSize);
  //   const textHeight = customFont.heightAtSize(textSize);

  page.drawRectangle({
    x: 40,
    y: 450,

    // width: textWidth,
    // height: textHeight,
    borderColor: rgb(1, 0, 0),
    borderWidth: 10,
  });

  const { width, height } = page.getSize();
  console.log(`width: ${width}, height: ${height}`);

  const fontSize = 30;
  page.drawText("Creating PDFs in JavaScript is awesome!", {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  });

  const pdfBytes = await pdfDoc.save();
  fs.writeFile("example.pdf", pdfBytes, "utf8", (err, data) => {
    if (err) console.log(err);
    if (data) console.log(data);
  });
};

(async () => {
  await createPDF();
})();
