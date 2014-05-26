var http = require("http"),
	path = require("path"),
	fs	 = require("fs"),
	extensions = {
		".html"	: "text/html",
		".css"	: "text/css",
		".js"	: "application/javascript",
		".png"	: "image/png",
		".jpg"	: "image/jpeg",
		".gif"	: "image/gif"
	};

http.createServer(function(req, res){

	var filename = path.basename(req.url) || "index.html",
		ext	= path.extname(filename),
		dir = path.dirname(req.url).substring(1),
		localpath = __dirname + "/public/";

	if(extensions[ext]) {
		localpath += (dir ? dir +"/" : "") + filename;
		path.exists(localpath, function(exists) {
			if(exists) {
				getFile(localpath, extensions[ext], res);
			} else {
				res.writeHead(404);
				res.end();
			}
		});
	}
}).listen(8000);

function getFile(localpath, mimeType, res) {
	fs.readFile(localpath, function(err, contents) {
		if(!err) {
			res.writeHead(200, {
				"Content-Type" : mimeType,
				"Content-Length" : contents.length
			});
			res.end(contents);
		} else {
			res.writeHead(500);
			res.end();
		}
	});
}
