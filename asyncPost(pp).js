"use strict";
const input = require('./output_files/asyncOutput.js'),
	    inLen = input.length,
	  columns = Object.keys(input[0]).length;

let out = [];

// prep a 2D array
for (let i = 0; i < inLen; i++) {
	out[i] = [];
}

// create header for each column
for (let j = 0; j < columns; j++) {
	out[0][j] = input[0][j];
}
//console.log(out[0]);
//console.log(input[1]["object"]);
// perform subsetting
for (let i = 0; i < inLen - 1; i++) {
	for (let j = 0; j < columns - 2; j++) {
		out[i + 1][j] = input[i + 1]["object"][input[0][j]];
	}
}

for (let i = 0; i < inLen - 1; i++) {
	for (let j = columns - 2; j < columns; j++) {
		// last for loop to concatenate al geographies into one string
		let len = input[i + 1]["object"].dimension[0].member.length;
		for (let k = 0; k < len; k++) {
			if (j < columns - 1) {
			out[i + 1][j] += input[i + 1]["object"].dimension[0].member[k].memberNameEn + ";";
			} else {
			out[i + 1][j] += input[i + 1]["object"].dimension[0].member[k].memberNameFr + ";";
			}
		}
	}
}

console.log(out);
