//MTD CHANNEL SPENT
var time = require("./time");
const { google } = require("googleapis");
const scopes = "https://www.googleapis.com/auth/analytics.readonly";
const key = require("./auth.json");

const jwt = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  scopes
);

const view_id = "--YOUR-VIEW-ID--";

exports.getData = async () => {
  const response = await jwt.authorize();
  const result = await google.analytics("v3").data.ga.get({
    auth: jwt,
    ids: "ga:" + view_id,
    "start-date": time[0].start,
    "end-date": time[0].today,
    metrics: "ga:adCost",
    dimensions: "ga:campaign"
  });
  let array = result.data.rows;
  let numArray = [];

  array.forEach(single => {
    if (single[0].match(/--YOUR-CAMPAIGN-NAME/gi)) {
      numArray.push(single[1]);
    }
  });

  function stringToNumber(array) {
    return array.map(Number).reduce((a, b) => a + b, 0);
  }

  return (arrayJson = [
    {
      procto: stringToNumber(proctoArray)
    }
  ]);
};
