const request = require("request");
const forecast = (lat, long, callback) => {
  const url =
    "https://api.darksky.net/forecast/98a7cf5fab79ce85e9e94cd0ec705813/" +
    lat +
    "," +
    long +
    "?lang=en";
  request({ url: url, json: true }, (err, { body } = {}) => {
    if (err) {
      callback(" Unable to connect to webserver", undefined);
    } else if (body.error) {
      callback(body.error, undefined);
    } else {
      callback(undefined, body);
    }
  });
};
module.exports = forecast;
