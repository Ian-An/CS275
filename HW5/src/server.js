var express = require('express');
var app = express();
var tables = require('./Tables.js');
var tbl = new tables;
var transcripts = require('./Transcripts');
var tr = new transcripts
var addStudent = require('./AddStudent');
var ad = new addStudent;




app.use(express.static("."));
app.listen(8080,function(){
  console.log("Server Running…");
});


// Tables server code
app.get('/tables', function (req,res) {
  res.send(tbl.render());
});

app.get('/Displaytable', function (req,res) {
  var type = req.query.type;
  // Once received the assembled table, send it back to client side
  tbl.once('tableReceived', function(html) {
    res.send(html);
  });
  tbl.displayTable(type);

});

// Transcripts server code
app.get('/transcripts', function (req,res) {
  tr.once('transcriptsPageReceived', function(html) {
    res.send(html);
  });
  tr.render();
});

app.get('/Displaytranscript', function (req,res) {
  var id = req.query.student_id;
  var term = req.query.term_taken;
  tr.once('transcriptReceived', function(html) {
    res.send(html);
  });
  tr.displayTranscript(id, term);
});


// Add student server ocde
app.get('/Addstudentpage', function(req, res) {
  res.send(ad.render());
});

app.get('/Addnewstudent', function (req,res) {
  ad.once('addStudentResultReceived', function(html) {
    res.send(html);
  });
  ad.addStudent(req.query);
});
