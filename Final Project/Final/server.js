//server code

var express = require('express');
var app = express()
var http = require('http')
var session = require('express-session');
var fs = require('fs');

app.use(session({ secret: 'this-is-a-secret-token',
	cookie: { maxAge: 60000 }}));

var mysql = require('mysql');
var con = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '123456',
	database: 'db'
});
con.connect(function(err){
	if(err){
		console.log('Could not connect to database');
		console.log(err);
	}
	else{
		console.log('Connected to Database...');
	}
});
//getting calculator module
var upload = require('./upload');
var u = new upload();

var explore = require('./explore');
var e = new explore();

app.use(express.static("."));

app.get('/login', function(req,res){
	var user = req.query.user;
	var pass = req.query.pass;
	con.query('select userName, password, userID from db.User;', function (err,rows,fields){
		for (var i = rows.length - 1; i >= 0; i--) {
			if(user == rows[i].userName && pass == rows[i].password){
				var sessData = req.session;
 				sessData.userID = rows[i].userID;
 				console.log(sessData.userID);
 				var content = fs.readFileSync("home.html","utf-8");
				res.send(content);
			}
		}
		res.writeContinue();
	});

})

app.get('/create', function(req, res) {
	var user = req.query.user;
	var pass = req.query.pass;
	con.query('select * from User;', function(err,rows, fields){
		var length = rows.length;
		var userId = length + 1;
		var query = `Insert into User (userID, userName, password) Values ('${userId}', '${user}', '${pass}')`;
		con.query(query, function(err, rows, fields) {
			if(err) {
				console.log(err);
			} else {
				res.send('ok');
			}
		});

	});
})

app.get('/home', function(req,res){
	var content = fs.readFileSync("home.html","utf-8");
	res.send(content);
})
//renders upload UI which is just a button and
app.get('/upload', function(req,res){
	var html = u.render();

	res.send(html);
})

app.get('/uploadItem', function(req,res){
	u.once('itemUploaded', function(html) {
    res.send(html);
  	});
	// Assume userId currently logged in
	var userID = req.session.userID;
	u.uploadItem(req.query, userID, con);
})

app.get('/explore', function(req,res){
	e.render(con);
	e.once('Table assembled', function(html){
		res.send(html);
	});


})

app.get('*', function(req,res ){
	res.redirect('./index.html')
});

app.listen(8080, function(){
	console.log('server running...')
})
