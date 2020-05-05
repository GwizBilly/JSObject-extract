"use strict";
const https = require('https'),
			pList = require('./input_files/list.js'),
		listLen = pList.length,
				url = "/t1/wds/rest/getCubeMetadata",
				 id = "productId",
		 CANSIM = "cansimId",
		     en =	"cubeTitleEn",
				 fr =	"cubeTitleFr",
			 freq	=	"frenquencyCode",
			 arch = "archiveStatusCode",
		 archEn	= "archiveStatusEn",
		 archFr	=	"archiveStatusFr",
		 nDataP	=	"nbDatapointsCube",
		    dim = "dimension",
				mem = "member",
				gEn = "memberNameEn",
				gFr = "memberNameFr";
let accString = JSON.stringify({
	productId: id,
	cansim: CANSIM,
	english: en,
	french: fr,
	frequencyCode: freq,
	archivedStatus: arch,
	archivedEnglish: archEn,
	archivedFrench: archFr,
	numberOfDatapoints: nDataP,
	geoEn: dim +"."+ mem +"."+ gEn,
	geoFr: dim +"."+ mem +"."+ gFr
});
// let p = '14100017', // []
let requestData = [],
				options = [];
// prepare 48 POST requests using pList as an input for product IDs 
(async function () {
	console.clear();
	for (let i = 0; i < listLen; i++) {
		// pList is a 2-dimensional array: 4x48; CANSIM, productId, freq, arch
		requestData[i] = '[{\"productId\":' + pList[i][1].substring(0,8) + '}]';
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
		await makeRequest(i);
	}
	//console.log("finished!");
	console.log(accString);
})();
async function makeRequest(i) {
	try {
		let http_promise = getPromise(i);
		let response_body = await http_promise;
		// here goes some extra processing if we want
		let stringOut = JSON.stringify(JSON.parse(response_body)[0]);
		accString = accString + "," + stringOut;
	} catch(error) {
		console.log(error);
	}
}
function getPromise(i) {
	return new Promise((resolve, reject) => {
		let req = https.request(options[i], (res) => {
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
		req.write(requestData[i]);
		req.end();
	});
}
