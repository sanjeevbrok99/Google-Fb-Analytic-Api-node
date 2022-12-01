var credentials = require("./auth.json");

let access_token = credentials.access_token;

params =
  "me?fields=adaccounts{campaigns.limit(200){insights{impressions,campaign_name,spend}}}";

var FB = require("fb");

var time = require("./time");

FB.setAccessToken(access_token);
exports.getResult = async () => {
  let result = [];
  let facebook = await FB.api("/v3.2/act_--YOUR FB ADS ACCOUNT--", "GET", {
    fields:
      "ads.limit(10000){insights.time_range({'since':'" +
      time[0].today +
      "','until':'" +
      time[0].today +
      "'}){ad_name,spend}}"
  });
  let data = await this.getData(facebook);

  return data;
};

exports.getData = async results => {
  let result = [];
  if (results) {
    if (results.ads) {
      if (results.ads.data) {
        let arrayNumber = [];
        results.ads.data.forEach(singleData => {
          if (singleData) {
            if (singleData.insights) {
              if (
                singleData.insights.data[0].ad_name.match(/--YOUR-AD-NAME/gi)
              ) {
                arrayNumber.push(singleData.insights.data[0].spend);
              }
            }
          }
        });
        function stringToNumber(array) {
          return array.map(Number).reduce((a, b) => a + b, 0);
        }

        let arrayJson = [
          {
            number: stringToNumber(arrayNumber)
          }
        ];
        result = arrayJson;
      }
    }
  }
  return result;
};
