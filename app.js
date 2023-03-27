const request = require("request");
const fs = require("fs");

async function generaeteBarcode(newData) {
    console.log(newData)
  return new Promise(async (resolve, reject) => {
    const options = {
      method: "POST",
      url: "https://api.products.aspose.app/barcode/generate/generatebarcode?culture=en",
      formData: {
        barcodetype: "ITF14",
        content: newData,
        filetype: "PNG",
        showCodeText: "true",
        filesize: "2",
      },
    };

    request(options, function (error, response) {
      if (error) throw new Error(error);
      resolve(response.body);
    });
  });
}

async function downloadBarcode(url) {
  request(url).pipe(fs.createWriteStream("barcode_"+new Date().getTime()+".png"));
}

if (process.argv[process.argv.length - 1].length > "1234567891234".split("").length) return console.log("Invalid data");

generaeteBarcode(process.argv[process.argv.length - 1]).then((data) => {
  downloadBarcode(
    "https://products.aspose.app/" + JSON.parse(data).downloadPath
  );
}); 