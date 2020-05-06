## JSON subsetting

We want to use a web API to automatically fetch some metadata information about some Labour Force Survey tables. 
Most of the work can be done after grabbing one big list of metadata (in JSON format) from the web. We have a list of product ID #s,
so we'll extract from the big list (all.js) only for the IDs found in the small list (list.js).

To get the big list I used:
```
curl https://www150.statcan.gc.ca/t1/wds/rest/getAllCubesList > ./input_files/all.js
```
and I modified the file so I can use "all.js" as a module:
```
const myThingy = [{},{},{},...];
module.exports = myThingy;
```
to include as a module in another file:
```
const myModule = require('./input_files/all.js');
```

The list of IDs (list.js) contains the CANSIM id, productId, freq, and archivedStatus (but we'll only use the productId).

## The Task

We would like the titles for each productId, in both official languages, along with other metadata (geo, frequency, datapoints, ...).

This first part is done with "boom.js" and two modules: "./input_files/all.js" and "./input_files/list.js"

We convert to csv using "viewBoom.js", using the output of "boom.js" as a module:
```
node viewBoom.js > ./output_files/finalBoom.csv
```
Developer resources for GET request: https://www.statcan.gc.ca/eng/developers/wds/user-guide#a11-4

## Restful client that fetches geography

This second part is done with asyncPost.js and one module: list.js

We need to perform this second part because the geography information needs to be extracted from a "getCubeMetadata" POST request.

We make one POST request per productId (asyncPost.js), followed by a cleanup of the data(asyncPost(pp).js), and outputting to .csv format (viewAsync.js).

Since some of the metadata information is repeated in both resources (GET and POST), we should verify our results match 😊

Developer resources for POST request: https://www.statcan.gc.ca/eng/developers/wds/user-guide#a11-1

## NodeJs environment and StatCan Web Data Service (WDS)

Once you've cloned this repo, you should run ' npm install ' to fetch the project dependencies (see package.json).
Then run the NodeJs programs in order (see technical details below for detailed step-by-step).

Here's a link to the main StatCan developer resource: https://www.statcan.gc.ca/eng/developers/wds

## Technical details

During the first step of extracting from the big JSON object(the results of a curl of "getAllCubesList") I output the results as a 2D-array. I did the same thing with the POST request; converting a JSON object into a 2D-array.

To convert the 2D-array into CSV format, I wrote a mini program to join each row of the 2d-array and did "console.log(theRow)" for each row. To save the output to a file, run the viewer program and redirect the standard output to a file (I'm on a \*nix command line):

*step0*
```
curl https://www150.statcan.gc.ca/t1/wds/rest/getAllCubesList > ./input_files/all.js
```
*step0a* 
make the file a module for use in next step (see above for details)
*step1* 
```
node boom.js > output_file/boomOutput.js
```
*step1a* 
make the file a module for use in next step
*step2*
```
node viewBoom.js > finalBoom.csv
 ```
"boom.js" takes input from "./input_files/list.js" and "./input_files/all.js" (list of IDs and the Big List that I "curled").
"viewBoom.js" takes input from the output of "boom.js".

Getting the geography goes as follows:

*step0*
```
node asyncPost.js > output_files/asyncOutput.js
```
*step0a* 
make the file a module for use in next step
*step1*
```
node asyncPost\(pp\).js > output_file/ppPost.js
```
*step1a* 
make the file a module for use in next step
*step2*
```
node viewPPPOST.js > output_file/finalAsync.js
```
"asyncPost.js" takes input from "./input_files/list.js" (list of IDs).
"asyncPost(pp).js" takes input from the output of "asyncPost.js".
"viewPPPOST.js" takes input from the output of "asyncPost(pp).js".
