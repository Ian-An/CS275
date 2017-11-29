var express = require('express');
var app = express();
var calculator = require('./Calculator.js');
var cal = new calculator;
var weather = require('./Weather.js');
var wea = new weather;



app.use(express.static("."));
app.listen(8080,function(){
  console.log("Server Running…");
});

// Calculator server code
app.get('/cal', function (req,res) {
  res.send(cal.render());
});

app.get('/cal/fact', function (req,res) {
  var seed = parseInt(req.query.seed);
  var result = cal.computeFactorial(seed);
  res.send(result);
});


app.get('/cal/sum', function (req,res) {
  var seed = parseInt(req.query.seed);
  var result = cal.computeSummation(seed);
  res.send(result);
});


// Weather server code
app.get('/weather', function (req,res) {
  res.send(wea.render());
});

app.get('/getWeather', function (req,res) {
  // Once the zip received
  wea.once('zipReceived', function(msg) {
    // Once the weather information received
    wea.once('weatherReceived', function(weather) {
      res.send(weather);
    });
    wea.getWeather(msg);
  });
  wea.getZip();
});
