"use strict"
let   all = require("./All.js"),
			IDs = require("./bigList.js"),
      len = all.length,
	 IDsLen = IDs.length,
			 id = "productId",
			 en = "cubeTitleEn",
			 fr = "cubeTitleFr";

let temp = [],
    masterCount = 0,
		out = [];

for (let i = 0; i < IDsLen; i++) {
	temp[i] = IDs[i][1].substring(0,8); // grab second column of each row
	//temp[i] = IDs[i][0].substring(0,3) +"-"+IDs[i][0].substring(3,7); // grab first column of each row
}

IDs = temp;
/*
console.log("The length of big list is " + len);
console.log("The length of little list is " + IDsLen);
console.log(all[0][id]);
console.log(IDs[0]);
*/
for (let ii = 0; ii < IDsLen; ii++) {
	out[ii] = [];
}

for (let i = 0; i < len; i++) {
	for (let j = 0; j < IDsLen; j++) {
		if (all[i][id] == parseInt(IDs[j])) {
			//console.log("Found it! It is " + all[i][id] + " and number " + j);
			//console.log(all[i]["cubeTitleEn"]);
			out[masterCount][0] = all[i][en];
			out[masterCount][1] = all[i][fr];
			out[masterCount][2] = all[i][id];
			out[masterCount][3] = all[i]["cansimId"];
			out[masterCount][3] = all[i]["archived"];
			out[masterCount][3] = all[i]["frequencyCode"];

			masterCount++
		}
	}
}
//console.log("Length of output is " + out.length);
console.log(out);
