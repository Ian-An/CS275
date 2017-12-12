function upload(){}
var fs = require('fs');
var http = require('http');
var EventEmitter = require('events').EventEmitter;
var utils = require('util');


utils.inherits(upload, EventEmitter);

upload.prototype.render= function(){
	var content = fs.readFileSync("upload.html","utf-8");
	return content;
}

upload.prototype.uploadItem = function(jsonObj, userID, con) {
	var self = this;
	var {itemName, imageURL, description, listPrice} = jsonObj;
	// sql query here
	var query = `INSERT INTO ITEM
	(userID, itemName, imagePath, description, listPrice)
	VALUES
	('${userID}', '${itemName}', '${imageURL}', '${description}', '${listPrice}')`;
	con.query(query, function(err, rows, field) {
          if(err) {
            console.log(err);
          } else {
            var html = `OK`;
            self.emit('itemUploaded', html);
          }
  });
}

module.exports = upload;