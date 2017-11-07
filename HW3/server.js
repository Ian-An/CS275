var express = require('express');
var app = express();


app.use(express.static("."));
// Check if the servering is running
app.listen(8080,function(){
  console.log("Server Running…");
});

// Factorial request
app.get('/fact', function (req,res){
  var seed = parseInt(req.query.seed);
  // Check if input is valid
  if(isNaN(seed) || seed <= 0 ) {
    res.send("Invalid Input!");
  } else {
    var fac = 1;
    var n = seed;
    while(n > 1) {
      fac *= n;
      n--;
    }
    res.send("The factorial for " + seed + " is " + fac + ".");
  }
});

// Summation request
app.get('/sum', function (req,res){
  var seed = parseInt(req.query.seed);
  // Check if input is valid
  if(isNaN(seed) || seed < 0 ) {
    res.send("Invalid Input!");
  } else {
    var sum = 0;
    var n = seed;
    while(n >= 0) {
      sum += n;
      n--;
    }
    res.send("The summation for " + seed + " is " + sum + ".");
  }
});
