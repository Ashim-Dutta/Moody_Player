var ImageKit = require("imagekit");

var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLICKEY,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
  urlEndpoint: process.env.URL_ENDPOINT,
});


function uploadFile(file) { 
    return new Promise((resolve, reject) => { 
        imagekit.upload(
          {
            file: file.buffer,
            fileName: Math.random().toString(36).substring(10),
            // fileName:new mongoose.Types.ObjectId().toString(),   //another way for create unique name
            folder: "Audio",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
    })
}


module.exports = uploadFile