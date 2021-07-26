const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path, filename) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.log(`Error reading ${path}:\n ${err}`);
			process.exit(1);
		}
		else {
			handleOutput(data, filename, path);
		}
	});
}

async function webCat(url, filename) {
	try {
		let res = await axios.get(url);
		handleOutput(res.data, filename, url);
	} catch (err) {
		console.log(`Error fetching ${url}:\n ${err}`);
		process.exit(1);
	}
}

function handleOutput(data, filename, source) {
	if (filename) {
		fs.writeFile(filename, data, 'utf8', err => {
			if (err) {
				console.log(`Couldn't write to ${filename}:\n ${err}`);
				process.exit(1);
			}
			else {
				console.log(`# no output, but ${filename} contains contents of ${source}`);
			}
		});
	}
	else {
		console.log(data);
	}
}

let path;
let filename = null;
if (process.argv[2] === '--out') {
	filename = process.argv[3];
	path = process.argv[4];
}
else {
	path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
	webCat(path, filename);
}
else {
	cat(path, filename);
}
