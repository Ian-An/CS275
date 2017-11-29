var mysql = require('mysql');
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var utils = require('util');


var key = fs.readFileSync('../key.txt', 'utf8');
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: key,
  database: 'demo'
});

utils.inherits(Transcripts,EventEmitter);

function Transcripts() {

}

Transcripts.prototype.render = function (){
  var self = this;
  con.query('SELECT student_id, first_name, last_name FROM student', function(err, rows, field){
    if(err) {
      console.log(err);
    } else {
      // Construct the options - students' names
      var html = `<div style="text-align: center;">
      <br/>
      <br/>
      <p>Student Name </p>
      <select id = "student_id" style = "width: 15%; height: 6%">
      `;
      for(var i = 0; i < rows.length; i++) {
        html += `<option value=`
        + rows[i].student_id +'>'
        + rows[i].first_name
        + ' '
        + rows[i].last_name
        + '</option>';
      }
      html += `</select><p>Term</p><select id = "term" style = "width: 15%; height: 6%">`;
      // Get the terms from db
      con.query('SELECT DISTINCT(term_taken) FROM grades', function(err, rows, field){
        if(err) {
          console.log(err);
        } else {
          for(var i = 0; i < rows.length; i++) {
            html += `<option value=`
            + rows[i].term_taken +'>'
            + rows[i].term_taken
            + '</option>';
          }
          html += `</select>
          <br/>
          <br/>
          <button style = "width: 30%; height: 8%" onclick = "displayTranscript()">Click to check !</button>
          <br/>
          <br/>
          </div>
          <div id = "output" style="margin-left: 35%"> </div>`;
          // Emit the assembled html to server
          self.emit("transcriptsPageReceived", html);
        }
      });

    }
  });
}

Transcripts.prototype.displayTranscript = function(id, term) {
  // Assemble the query
  var sql_query = `SELECT first_name, last_name, grade, c.course_id, term_taken FROM student s, grades g, course c WHERE s.student_id = g.student_id AND c.course_id = g.course_id AND s.student_id = ` + parseInt(id) + ' AND ' + `term_taken = '` + term + `'` ;

  var self = this;
  con.query(sql_query, function(err, rows, field) {
    if(err) {
      console.log(err);
    } else {
      var html = '';
      for(var i = 0; i < field.length; i++) {
        html = html + '<th>' + field[i].name +'</th>';
      }
      html = '<tr>' + html + '</tr>';

      // Populate the table
      for(var i = 0; i < rows.length; i++) {
        html += '<tr>';
        for(var j = 0; j < field.length; j++) {
          html += '<td>' + rows[i][field[j].name] + '</td>'
        }
        html += '</tr>'
      }
      html = `<table border='2'>` + html + '</table>';
      // Event emits
      self.emit("transcriptReceived", html);
    }
  });
}
module.exports = Transcripts;
