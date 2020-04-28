"use strict";
const https = require('https'),
			pList = require('./input-files/list.js'),
				url = '/t1/wds/rest/getCubeMetadata',
				  h = [
						"productId",
						"cansimId",
						"cubeTitleEn",
						"cubeTitleFr",
						"frenquencyCode",
						"archiveStatusEn",
						"archiveStatusFr",
						"nbDatapointsCube",
						"\n",
					];
// to start... get the dimension[] length

let accString = "",
outputHeaders = h.join(",");
// let p = '14100017', // []
let requestData = [],
 options = [];
// prepare 48 POST requests using pList as an input for product IDs 
for (let i = 0; i < listLen; i++) {
	// pList is a 2-dimensional array: 4x48; CANSIM, productId, freq, arch
	requestData[i] = '[{\"productId\":' + pList[i][1] + '}]';
	options[i] = {
		hostname: 'www150.statcan.gc.ca',
		port: 443,
		path: url,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': requestData[i].length
		}
	}
}
(async function () {
	console.clear();
	await makeRequest();
	console.log("finished!");
})();
async function makeRequest() {
	try {
		let http_promise = getPromise();
		let response_body = await http_promise;
		// here goes some extra processing if we want
		// console.log(response_body);
		accString += respose_body;
	} catch(error) {
		console.log(error);
	}
}
function getPromise() {
	return new Promise((resolve, reject) => {
		let req = https.request(options, (res) => {
			let chunks_of_data = [];
			res.on('data', (fragments) => {
				chunks_of_data.push(fragments);
			});
			res.on('end', () => {
				let response_body = Buffer.concat(chunks_of_data);
				resolve(response_body.toString());
			});
			res.on('error', (error) => {
				reject(error);
			});
		});
		req.on('error', (error) => {
			console.log(error);
		});
		req.write(data);
		req.end();
	});
}
