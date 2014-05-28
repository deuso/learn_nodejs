var connect = require("connect"),
	redis = require("redis"),
	db = redis.createClient(6379, "127.0.0.1"),
	connectRt = require("connect-route");


connect(
	connect.static(__dirname + "/public"),
	connectRt(function(app) {
		app.get("/sayhello/:name", function(req, res) {
			var username = req.params.name;
			db.hget("user", username, function(err, val){
				if(err) {
					throw err;
				}
				html = "<!doctype html><html lang='en'><head><meta charset='UTF-8'q /><title>Hello " +
				username + "</title></head><body><h1>Hello " + username+ "</h1><p>Welcome to " +
				val + "</p></body></html>";
				res.end(html);
			});
		});
	})
).listen(8000);