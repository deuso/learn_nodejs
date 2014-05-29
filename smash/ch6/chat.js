var net = require('net'),
	count = 0,
	users = {};

var server = net.createServer(function(conn) {
	var nickname;
	console.log("User joined");
	conn.setEncoding('utf8');
	conn.write(
		'\n > welcome to \033[92mnode-chat\033[39m!'
	  + '\n > ' + count + ' other people are connected at this time.'
	  + '\n > please write your name and press enter: '
		);
	count++;
	conn.on('close', function() {
		count--;
		console.log('User leaving');
		delete users[nickname];
		bcast("\033[90m > " + nickname + " left the room\033[39m\n");
	});
	function bcast(msg, notme) {
		for(i in users) {
			if(!notme || i!=nickname) {
				users[i].write(msg);
			}
		}
	}
	conn.on('data', function(data) {
		//console.log(data);
		data = data.replace('\r\n','');
		if(!nickname) {
			if(users[data]) {
				conn.write('\033[93m Nickname already been used, try again:\033[39m');
				return;
			} else {
				nickname = data;
				users[nickname] = conn;

				bcast("\033[90m > " + nickname + " joined the room\033[39m\n");
			}
		} else {
			// if(i==nickname) {
			// 	bcast("\033[96m >  *you*:\033[39m "+data+'\n');
			// } else {
				bcast("\033[96m > " + nickname + ":\033[39m "+data+'\n');
			// }
		}
	});
});
server.listen(3000, function() {
	console.log("\033[96m    Server Listening on port 3000\033[39m");
});