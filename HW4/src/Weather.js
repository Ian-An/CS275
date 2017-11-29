var fs = require('fs');
var http = require('http');
var EventEmitter = require('events').EventEmitter;
var utils = require('util');

var key = fs.readFileSync('../key.txt', 'utf8');

utils.inherits(Weather,EventEmitter);



function Weather() {

}

Weather.prototype.render = function () {
  var html = `<div style="text-align: center;">
  <button onclick="getWeather()">
  Click to get weather!
  </buton>
  </div>
  <div id = "output" style="text-align: center;"> </div>`;
  return html;
};

Weather.prototype.getZip = function() {
  var options = {
    host: 'api.wunderground.com',
    path: '/api/' + key + "/geolookup/q/autoip.json"
  };
  var self = this;
  var str = '';
  http.request(options, function(response) {
    response.on('data', function (chunk) {
      str += chunk;
    });
    response.on('end', function() {
      var json = JSON.parse(str);
      var zip = json.location.zip;
      self.emit("zipReceived", zip);
    });
  }).end();

}

Weather.prototype.getWeather = function(zip) {
  var options = {
    host: 'api.wunderground.com',
    path:  '/api/' + key + '/hourly/q/' + zip + '.json'
  };
  var self = this;
  var str = '';
  http.request(options, function(response) {
    response.on('data', function(chunk) {
      str += chunk;
    });
  response.on('end', function() {
    var json = JSON.parse(str);
    var output = "";
    var hourlyData = json.hourly_forecast;
    // Generate the table to display hourly weather forecast
    for(var i = 0; i < hourlyData.length; i++) {
      output += "<tr>"
      + "<td>"
      + "<strong style='font-size:20px';>" + hourlyData[i].FCTTIME.pretty + "</strong>"
      + "</td>"
      + "<td>"
      + "<img src=\"" + hourlyData[i].icon_url + "\"/>"
      + "</td>"
      + "</tr>";
    }
    var table = "<table data-role='table' class='ui-responsive' align='center'>" + output + "</table>";
    self.emit("weatherReceived", table);
    });
  }).end();
}
module.exports = Weather;
