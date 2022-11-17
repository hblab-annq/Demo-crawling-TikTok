const cheerio = require("cheerio");
const request = require("request-promise");
const fs = require("fs");

const getTikTokUserInfo = require("./crawl/user");
const getVideoData = require("./crawl/video");

getTikTokUserInfo()
  .then((data) => fs.writeFileSync("./data/data.json", JSON.stringify(data)))
  .then(() => console.log("end userInfo: " + new Date()));

// getVideoData()
//   .then((data) => fs.writeFileSync("./data/video.json", JSON.stringify(data)))
//   .then(() => console.log("end video: " + new Date()));
