var express = require('express');
var app = express();


app.listen(8080,function(){
  console.log("Server Running…");
});

app.use(express.static("."));

app.get('/part1', function (req,res){
  //console.log(req.query.message);
  //console.log(req.query.count)
  var message = req.query.message;
  var count = parseInt(req.query.count);
  var response = "";
  for(var i = 0; i < count; i++) {
    response = response + message;
  }
	res.send(response);
})
