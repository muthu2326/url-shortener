const Url = require('../model/UrlModel');

const generateUniqueUrlCode = async () => {
    while(true) {
      let urlCode = generateShortURL();
      console.log('urlCode ==>', urlCode)
      let url = await Url.findOne({urlCode: urlCode});
      if (!url) {
          console.log("urlCode +++>", urlCode)
        return urlCode
      }
    }
  }

 const generateShortURL = () => {

    console.log("Entering generateShortURL")
    let urlCode = (Math.random() + 2).toString(36).substring(7);
    return urlCode;

 }

module.exports = {generateUniqueUrlCode, generateShortURL}