const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibXVrZXNoOTAwNyIsImEiOiJjank2eWt4ejAwNjRyM2pvNnFlMXdpa243In0.tnPznfhiDNX8GESZRyx-MA&limit=1";
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to Connect Tp Location Sevices", undefined);
    } else if (body.features.length === 0) {
      callback(
        " Unable to find Location Retry with another keyword ",
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name
      });
    }
  });
};
module.exports = geocode;
