var connect = require("connect");
var connectRt = require("connect-route");

connect(
	connect.static(__dirname + "/public"),
	connectRt(function(app) {
		app.get("/sayhello/:fname/:lname", function(req, res) {
			var username = req.params.fname + " " + req.params.lname,
				html = "<!doctype html><html lang='en'><head><meta charset='UTF-8'q /><title>Hello " +
				username + "</title></head><body><h1>Hello " + username+ "</h1></body></html>";
			res.end(html);
		});
	})
	).listen(8000);