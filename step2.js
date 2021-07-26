const fs = require('fs');
const argv = process.argv;
const axios = require('axios');

function cat(path) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.log(`Error reading ${path}:\n ${err}`);
			process.kill(1);
		}
		else {
			console.log(data);
		}
	});
}

function webCat(url) {
	axios
		.get(url)
		.then(response => {
			console.log(response);
		})
		.catch(err => {
			console.log(`Error reading ${url}:\n ${err}`);
		});
}

if (argv[2].startsWith('http://') || argv[2].startsWith('https://')) {
	webCat(argv[2]);
}
else {
	cat(argv[2]);
}
