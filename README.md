## JSON subsetting

We want to use a web API to automatically fetch some metadata information about some Labour Force Survey tables. 
Most of the work can be done after grabbing one big list of metadata from the web. We have a list of product ID #s,
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
to include as a module:
```
const myModule = require('./input_files/all.js');
```

The list of IDs (list.js) also contains the CANSIM id, productId, freq, and archivedStatus (but we'll only use the productId).

*The Task*
We would like the titles for each productId, in both languages, along with a few other metadata (geo, frequency, datapoints).

This first part is done with "boom.js" and "./input_files/all.js" and "./input_files/list.js"

Developper resources for GET request: https://www.statcan.gc.ca/eng/developers/wds/user-guide#a11-4

## Restful client that fetches geography

The geo needs to be extracted from a "cubeMetadata" POST request. 
One request per productId, followed by a cleanup of the data, and outputing to .csv format.

This second part is done with asyncPost.js and list.js, then we clean up with async(pp).js.

Since some of the metadata information is repeated in both resources, we can verify our results 😊

Developper resources for POST request: https://www.statcan.gc.ca/eng/developers/wds/user-guide#a11-1

## NodeJs environment and Statcan Web Data Service

Once you've cloned this repo, you should run ' npm install ' to fetch the project dependencies (see package.json).
Then run the nodeJs programs in order (see below).

Here's a link to the main statcan developper resource: https://www.statcan.gc.ca/eng/developers/wds

## Techincal details

During the first step of extracting from the big JSON object(the results of a curl of "getAllCubesList") I output the results as a 2D-array. I did the same thing with the POST request, converting a JSON object into a 2D-array.

To convert the 2D-array into CSV format, I wrote a mini program to join each row of the 2d-array and did "console.log(theRow)" for each row.
The final step is to run this viewer program and redirect the standard output to a file (I'm on a unix system):

*step0*
curl https://www150.statcan.gc.ca/t1/wds/rest/getAllCubesList > ./input_files/all.js
*step0a* 
make the file a module for use in next step
*step1* 
node boom.js > output_file/boomOutput.js
*step1a* 
make the file a module for use in next step
*step2*
node viewBoom.js > final.csv
 
"boom.js" takes input from "./input_files/list.js" and "./input_files/all.js" (list of IDs and the Big List that I "curled").
"viewBoom.js" takes input from the output of "boom.js".

*step0*
node asyncPost.js > output_files/asyncOutput.js
*step0a* 
make the file a module for use in next step
*step1* 
node asyncPost\(pp\).js > output_file/ppPost.js
