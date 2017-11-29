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

utils.inherits(AddStudent,EventEmitter);

function AddStudent() {

}

AddStudent.prototype.render = function() {
  var html = `<div style="text-align: center;">
  <form>
  First Name: <input type="text" id="first_name" required><br><br>
  Last Name: <input type="text" id="last_name" required><br><br>
  Date of Birth: <input type="text" id="date_of_birth" required><br><br>
    Major: <input type="text" id="major" required><br><br>
  ID: <input type="text" id="id" required><br><br>
  </form>
  <br/>
  <br/>
  <button style = "width: 30%; height: 8%" onclick = "addNewStudent()" type="submit">Add Student</button>
  <br/>
  <br/>
  </div>
  <div id = "output" style="margin-left: 35%"> </div>`;
  return html
}

AddStudent.prototype.addStudent = function(jsonObj) {
  var { student_id, major, date_of_birth, first_name, last_name } = jsonObj;
  var self = this;
  con.query(`SELECT student_id FROM student where student_id = ${student_id}`, function(err, rows, field) {
    if(err) {
      console.log(err);
    } else {
      // If the entry exists!
      if(rows.length != 0) {
        var html = `<div> This student already exists in database!</div>`;
        self.emit('addStudentResultReceived', html);
      } else {
        console.log('called');
        var sql_query = `INSERT INTO student (student_id, first_name, last_name, date_of_birth, major) VALUES ('${student_id}', '${first_name}', '${last_name}', '${date_of_birth}', '${major}')`;
        con.query(sql_query, function(err, rows, field) {
          if(err) {
            console.log(err);
          } else {
            var html = `<div> Sucessfully Added!</div>`;
            self.emit('addStudentResultReceived', html);
          }
        });
      }
    }
  });

}
module.exports = AddStudent;
