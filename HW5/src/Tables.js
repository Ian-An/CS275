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
con.connect(function(err) {
  if (err) {
    console.log('Error connecting to database');
  }
  else {
    console.log('Database successfully connected');
  }
});

utils.inherits(Tables,EventEmitter);

function Tables(){
}

Tables.prototype.render = function() {
  var html = `<div style="text-align: center;">
  <br/>
  <br/>
  <select id = "table_type" style = "width: 15%; height: 6%">
    <option value="student">Student Table</option>
    <option value="course">Courses Table</option>
    <option value="grades">Grades Table</option>
  </select>
  <br/>
  <br/>
  <button style = "width: 30%; height: 8%" onclick = "displayTable()">Click to display the table you want to see !</button>
  <br/>
  <br/>
  </div>
  <div id = "output" style="margin-left: 35%"> </div>`;
  return html;
}


Tables.prototype.displayTable = function(table_type) {
  var self = this;
  con.query('SELECT * FROM ' + table_type, function(err, rows, field){
    if(err) {
      console.log(err);
    } else {
      // Extract headers' names
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
      self.emit("tableReceived", html);
    }
  });

}





module.exports = Tables;
