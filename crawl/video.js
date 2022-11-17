const cheerio = require("cheerio");
const request = require("request-promise");
const fs = require("fs");

const getVideoData = async function (uri) {
  let data = [];
  console.log("start video: " + new Date());
  // var array = fs.readFileSync("video.txt").toString().split("\r\n");
  // const array = ["https://www.tiktok.com/@11b6_k6/video/7160277496506731802"];
  const rawdata = fs.readFileSync("./data/data.json");
  let user_list = JSON.parse(rawdata);
  let array = [];
  user_list.forEach((user) => {
    const { list_link_video } = user;
    array.push(...list_link_video);
  });

  for (let i = 0; i < array.length; i++) {
    const uri = array[i];
    const options = {
      uri: uri,
      headers: {
        // "User-Agent":
        //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
        Cookie:
          "_abck=676CE600077656C3C9E1D996600C01AE~-1~YAAQFuh6LYNaZj6EAQAAEylBfwik9XQimLdi4U0uh6P7M+HDX4dMwVemvDofB6FbCiyuX8zYkr53Q3XL5uHPQjpW3LdPi4/Xd6Nj4QN4DDh00YrxLlfCN0a1eW3NGEHY+W6h15TeVBr4y0qfBfSqJAcQy//y2gIc8FCQ3lyIEC4zV6NdCkikB6M67PdpgfTy3DJjoZSJK5uoPvhYeIg1j6DyBlnry7VGjKi9fJjWP72qLZ5rywbx3RF7n4QfFsR/zjZtew257ErHOuFSQ9N43LXE61br1D4g6CSoOIXGorDDE8qyWQWOKWCTqxQe5s/r9BFlxuGyNOWCEyRCobXdJ5RHF0E5+StVRXNUOqM=~-1~-1~-1; bm_sz=5C6CA7387E1853B9451646275B25A3A8~YAAQLRBFdupXBmWEAQAAQgcjfxHAj6Fsb9XYjMnSDTM1fRbIf5KPaNOhlMQ5EtpgEcMrHI8TsjTzIRwUWa9+uo+8N8kxjRhzI6qXddRjZ5PSQv/12XL3ynGhQlsmEbxxIMsuXiGoTXSF1Xhz1LOvzoD779Vq1/598nHoglu8o4/trcKorKWMQ2qw84vOFT4LWmZ1WDH31rEOxiIDSDM8WkhfkpMN/6Q3DobvfAGjo8V6NliY9H9bFhMr8kvzlcNsHbMMyLPoUsJ241jtWRGizxw1AWuUOemMmciU9V1t5CsvY3g=~4599874~3228982; msToken=SZ-fgOfbaHFQyRiZtUdo2vykoWksF_dfOXojTEo5TCapPYC38wqWE-BnGIH3x6D_dsehyz_07tThvRlfQe7NwxzDFqZkCQesh_W-3jKUpD0nRPXjShslCWrc8-WYtl1URx8VkmqhrIM9bf5ltKU=; tt_chain_token=lvPEaiQAHc+7D3l7u+a4LA==; tt_csrf_token=Ctx4dNeo-T_DPNNNq5tEzaWur2Nkb7IU6NDQ; ttwid=1%7CQPn0qSUAD97MpVKffEiyA__XO2suFLb8FAjRtmoABXY%7C1668580813%7C230f5045921ce5628c85c0c1b945d8550ae99a420c1a913ce010f1a2dbd48df9",
      },
    };

    await request.get(options, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const like = $("[data-e2e='like-count']").text().trim();
        const comment = $("[data-e2e='comment-count']").text().trim();
        const date = $("[data-e2e='browser-nickname'] span")[1].children[0]
          .data;

        data.push({
          uri,
          like,
          comment,
          date,
        });
      } else {
        console.log("video");
      }
    });
  }
  return data;
};

module.exports = getVideoData;
