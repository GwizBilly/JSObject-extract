"use strict"
let masterCount = 0,
            IDs = require("./input_files/list.js"), // list of product IDs
           temp = [],
		        out = [];
const all = require("./input_files/all.js"), // big list of metadata
			 id = "productId",
			 en = "cubeTitleEn",
			 fr = "cubeTitleFr",
		start = "cubeStartDate",
	    end = "cubeEndDate",
		 arch = "archived",
		 freq = "frequencyCode",
dimsArray = "dimensions",
      len = all.length,
	 IDsLen = IDs.length;

// grabbing productId from IDs
for (let i = 0; i < IDsLen; i++) {
	// grab second column of each row, but also a substring so as to cutoff an unwanted bit	
	temp[i] = IDs[i][1].substring(0,8);
	//temp[i] = IDs[i][0].substring(0,3) +"-"+IDs[i][0].substring(3,7); // grab first column of each row
}
IDs = temp;
/* some debug stuff
	console.log("The length of big list is " + len);
	console.log("The length of little list is " + IDsLen);
	console.log(all[0][id]);
	console.log(IDs[0]);
*/
// prepare a 2-dimensional array
for (let ii = 0; ii < IDsLen; ii++) {
	out[ii] = [];
}
// perform the subsetting
for (let i = 0; i < len; i++) {
	for (let j = 0; j < IDsLen; j++) {
		if (all[i][id] == parseInt(IDs[j])) {
			//console.log("Found it! It is " + all[i][id] + " and number " + j);
			//console.log(all[i]["cubeTitleEn"]);
			out[masterCount][0] = all[i]["cansimId"];
			out[masterCount][1] = all[i][id];
			out[masterCount][2] = all[i][en];
			out[masterCount][3] = all[i][fr];
			out[masterCount][4] = all[i][start];
			out[masterCount][5] = all[i][end];
			out[masterCount][6] = all[i][arch];
			out[masterCount][7] = all[i][freq];
			out[masterCount][8] = all[i][dimsArray].length;
			masterCount++
		}
	}
}
/* verify output matches input
	console.log("Length of output is " + out.length);
	console.log("Length of input was " + IDsLen);
*/
console.log(out);
