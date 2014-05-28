var fs = require('fs'),
	stdin = process.stdin,
	stdout = process.stdout;
var stats = [];

fs.readdir(process.cwd(), function(err, files){
	console.log('');

	if(!files.length) {
		console.log("	\33[31m No file exists...\33[39m\n");
	}
	console.log("Select file id:");
	function file(i) {
		//list cur file
		var f = files[i];
		fs.stat(__dirname+'/'+f, function(err, stat) {
			stats[i] = stat;
			if(stat.isDirectory()) {
				console.log("["+i+"] \033[36m*"+f+"\033[39m");
			} else {
				console.log("["+i+"] \033[90m"+f+"\033[39m");
			}
		
			i++;
			if(i==files.length) {
				read();	
			} else {
				file(i);
			}
		});
	}
	function read() {
		console.log('');
		stdout.write("---->");
		stdin.resume();
		stdin.setEncoding('utf8');
		stdin.on('data', chooseFile);
	}

	function chooseFile(data) {
		var i = Number(data),
			f = files[i],
			stat = stats[i];
		if(!f) {
			stdout.write('---->');
		} else { 
			stdin.pause();
			if(stat.isDirectory()) {
				fs.readdir(__dirname+'/'+f, function(err, flist) {
					console.log('');
					console.log('------ '+flist.length+' files');
					flist.forEach(function(file) {
						console.log('	- '+file);
					});
					console.log('');
				});
			} else {
				//stdin.pause();
				fs.readFile(__dirname+'/'+f, 'utf8', function(err, data) {
					console.log('');
					console.log(data);
				});
			}
		}
	}
	file(0);
});



