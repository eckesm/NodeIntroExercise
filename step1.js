const fs = require('fs');
const argv = process.argv;

function cat(path) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.log(`Error reading ${argv[2]}:\n`, err);
			process.kill(1);
		}
		else {
			console.log(data);
		}
	});
}

cat(argv[2]);
