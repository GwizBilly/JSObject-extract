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
let data = [],
 options = {};

for (let i = 0; i < listLen; i++) {
	data[i] = '[{\"productId\":' + pList[i][1] + '}]',
	options = {
		hostname: 'www150.statcan.gc.ca',
		port: 443,
		path: url,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': data[i].length
		}
	};
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
