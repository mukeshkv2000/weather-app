const weatherInput = document.querySelector("form");
const searchElement = document.querySelector("input");
var address;

weatherInput.addEventListener("submit", event => {
  event.preventDefault();
  const location = searchElement.value;
  console.log(location);
  fetch("http://localhost:3000/weather?address=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        console.log(data.error);
        document.getElementById("error").innerText = data.error;
        $("#error")
          .delay(2000)
          .fadeOut("slow");
      } else {
        console.log(data);
        var icon = data.forecast.currently.icon;
        // render image
        $("<img/>")
          .attr("src", "images/" + icon + ".png")
          .appendTo("#image");
        // console.log(data.daily.data[0].summary);

        // function to convert time stamp to time
        function pad(num) {
          return ("0" + num).slice(-2);
        }
        function getTimeFromDate(timestamp) {
          var date = new Date(timestamp * 1000);
          var hours = date.getHours();
          var minutes = date.getMinutes();
          var seconds = date.getSeconds();
          return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
        }
        //  Fri Dec 02 2016 14:03:52 GMT+0530 (IST)
        t = getTimeFromDate(data.forecast.currently.time);

        document.getElementById("location").innerHTML = data.location;
        document.getElementById("ct").innerHTML = t;
        document.getElementById("temp").innerHTML =
          data.forecast.currently.temperature;
        document.getElementById("precip").innerHTML =
          data.forecast.currently.precipProbability;
        document.getElementById("cloudcover").innerHTML =
          data.forecast.currently.cloudCover;
        document.getElementById("precipType").innerHTML =
          data.forecast.currently.precipType;
        document.getElementById("humidity").innerHTML =
          data.forecast.currently.humidity;
        document.getElementById("pressure").innerHTML =
          data.forecast.currently.pressure;
        document.getElementById("windspeed").innerHTML =
          data.forecast.currently.windSpeed;
        document.getElementById("visibility").innerHTML =
          data.forecast.currently.visibility;
        document.getElementById("uvindex").innerHTML =
          data.forecast.currently.uvIndex;

        document.getElementById("summary").innerHTML =
          data.forecast.daily.summary;
        console.log("mukesh" + data.forecast.daily.summary);
      }
    });
  });
});
