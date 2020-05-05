"use strict";
const lfs = require('./output_files/ppPost.js'),
	 lfsLen = lfs.length;
for (let i = 0; i < lfsLen; i++) {
	console.log("\""+lfs[i].join("\",\"") + "\"");
}
