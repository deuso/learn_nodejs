[1, 2, 3].forEach(function (v) {
	console.log(v);
});

[1,10,20].map(function (v) {
	return v*10;
});

var http = require("http");

var fs = require('fs');

fs.readFile("11", function(err, data) {
	if(err) return console.error(err);
	console.log(data);
});
