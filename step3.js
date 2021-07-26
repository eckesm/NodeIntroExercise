const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path, filename = null) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.log(`Error reading ${path}:\n ${err}`);
			process.kill(1);
		}
		else {
			if (filename) {
				writeDataToFilename(data, filename, path);
			}
			else {
				console.log(data);
			}
		}
	});
}

async function webCat(url, filename = null) {
	try {
		let res = await axios.get(url);
		if (filename) {
			writeDataToFilename(res.data, filename, path);
		}
		else {
			console.log(res.data);
		}
	} catch (err) {
		console.log(`Error fetching ${url}:\n ${err}`);
		process.kill(1);
	}
}

function writeDataToFilename(data, filename) {
	fs.writeFile(filename, data, 'utf8', err => {
		if (err) {
			console.log(`Couldn't write to ${filename}:\n ${err}`);
			process.kill(1);
		}
		else {
			console.log(`# no output, but ${filename} contains contents of ${path}`);
		}
	});
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
