const { google } = require("googleapis");
const scopes = "https://www.googleapis.com/auth/analytics.readonly";
const key = require("./auth.json");
const jwt = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  scopes
);

const view_id = "--YOUR VIEW ID--";

var time = require("./time");

exports.getData = async () => {
  const response = await jwt.authorize();
  const resultOrganic = await google.analytics("v3").data.ga.get({
    auth: jwt,
    ids: "ga:" + view_id,
    "start-date": time[0].today,
    "end-date": time[0].today,
    metrics: "ga:users",
    filters: "ga:channelGrouping=@Organic",
    dimensions: "ga:channelGrouping, ga:landingPagePath"
  });
  let arrayOrganic = resultOrganic.data.rows;

  let organicArray = [],
    inOrganicArray = [];
  arrayOrganic.forEach(single => {
    if (single[1].match(/--YOUR-SEARCH-CRITERIA--/gi)) {
      organicArray.push(single[2]);
    }
  });

  const resultInorganic = await google.analytics("v3").data.ga.get({
    auth: jwt,
    ids: "ga:" + view_id,
    "start-date": time[0].today,
    "end-date": time[0].today,
    metrics: "ga:users",
    filters:
      "ga:channelGrouping=@other,ga:channelGrouping=@Social,ga:channelGrouping=@Paid,ga:channelGrouping=@Display,ga:channelGrouping=@Referral",
    dimensions: "ga:channelGrouping, ga:landingPagePath",
    "start-index": "1",
    "max-results": "1000000"
  });

  let arrayInorganic = resultInorganic.data.rows;

  arrayInorganic.forEach(single => {
    if (single[1].match(/--YOUR-SEARCH-CRITERIA--/gi)) {
      inOrganicArray.push(single[2]);
    }
  });

  function stringToNumber(proctoArray) {
    return proctoArray.map(Number).reduce((a, b) => a + b, 0);
  }

  return (arrayJson = [
    {
      organic: stringToNumber(proctoOrganicArray),
      inorganic: stringToNumber(proctoInOrganicArray)
    }
  ]);
};
