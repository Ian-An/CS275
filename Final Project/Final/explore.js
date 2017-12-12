function explore(){}
var fs = require('fs');
var http = require('http');
var EventEmitter = require('events').EventEmitter;
var utils = require('util');

utils.inherits(explore,EventEmitter);

explore.prototype.render= function(con){
	var content = fs.readFileSync("explore.html","utf-8");
	var self = this;
	var table = content;
	con.query("SELECT * FROM barter.item", function(err, rows, fields){
		if(err) {
			console.log("Error during query processing!!");
		}
		else {
			console.log("here")
			table = `<center>
			<table id="container">
			<thead>
			<tr>
				<th><h1>Oweners ID</h1></th>
				<th><h1>Image</h1></th>
				<th><h1>Item</h1></th>
				<th><h1>List Price</h1></th>
				<th><h1>Description</h1></th>
			</thead>
			</tr>
			<tbody>`;
			
			for (var i = 0; i < rows.length; i++) {
				table += '<tr>';
				table += '<td>' + rows[i].userID + '</td>';
				table += '<td>' + '<img src="'+ rows[i].imagePath +'">'+ '</td>';
				table += '<td>' + rows[i].itemName + '</td>';
				table += '<td>' + rows[i].listPrice + '</td>';
				table += '<td>' + rows[i].description + '</td>';
				table +='</tr>';
			}
			table += '</thead> </table> </center>';
			content += table;
			content += "</div>";
			content += "</center>";
			content += "</div>";
			self.emit('Table assembled', content);
			
		}
	})
	
}

module.exports = explore;