var Person = require("./person");

var me = new Person("Zeng Lu");

me.talk();

var buf = new Buffer('==ii1j2i3h1i23h', 'base64');

console.log(buf);
require('fs').writeFile('my.png', buf);