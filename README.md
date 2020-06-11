## NodeJs environment and StatCan Web Data Service (WDS)

Once you've cloned this repo, you should run ' npm install ' to fetch the project dependencies (see package.json).
Then run the NodeJs programs in order (see technical details below for detailed step-by-step). If you don't have NodeJs, and/or you don't have a Linux or Unix type of command line interface, these instructions won't work.

You can get this working on the following platform:

1. Android smartphone or tablet (Termux + nodejs).
2. Windows 10 with Windows Subsystem for Linux + nodejs
3. anything \*nix (Such as a 10$ Raspberry Pi Zero)
4. a mac product probably works fine too (I haven't tested it).

Here's a link to the main StatCan developer resource: https://www.statcan.gc.ca/eng/developers/wds

## The Task at hand

We would like the titles for each productId, in both official languages, along with other metadata (geo, frequency, datapoints, ...). We want to use a web API to automatically fetch the metadata information about some Labour Force Survey tables (list.js). 

## JSON subsetting

Most of the work can be done after grabbing one big list (all.js) of metadata (in JSON format) from the web. We have a list of product ID #s, so we can do an extraction on the big list, after we do a GET request to obtain information on all products.

To get the big list I used curl (but you can also just plug the URL into a browser):
```
curl https://www150.statcan.gc.ca/t1/wds/rest/getAllCubesList > ./input_files/all.js
```
Notice that I redirect the output from curl to a file called "all.js", and I modified this file so I can use it as a module:
```
const myThingy = [{},{},{},...];
module.exports = myThingy;
```
to include "all.js" as a module in another file (boom.js):
```
const myModule = require('./input_files/all.js');
```

The list of IDs (list.js) contains the CANSIM id, productId, freq, and archivedStatus (but we'll only use the productId).

This first part (JSON subsetting) is done with "boom.js" and two modules: "./input_files/all.js" and "./input_files/list.js"

We then convert to csv by running "viewBoom.js", using the output of "boom.js" as a module:
```
node viewBoom.js > ./output_files/finalBoom.csv
```
Notice that I redirect the output from "viewBoom.js" to a file called "finalBoom.csv".

Developer resources for GET request: https://www.statcan.gc.ca/eng/developers/wds/user-guide#a11-4

## Restful client that fetches geography (POST request)

This second part is done with "asyncPost.js" and one module: "list.js".

We need to perform this second part (asynchronous web requests) because the geography information needs to be extracted from a "getCubeMetadata" POST request.

We make one POST request per productId (asyncPost.js), followed by a cleanup of the data(asyncPost(pp).js), and outputting to .csv format (viewAsync.js). This is more complicated because there isn't one big list with the information we want. We have to make our own list by making multiple requests, followed by subsetting like in our first step shown above.

Since some of the metadata information is repeated in both resources (GET and POST), we should verify that our results match 😊

Developer resources for POST request: https://www.statcan.gc.ca/eng/developers/wds/user-guide#a11-1

## Technical details

During the first step of extracting from the big JSON object(the results of a curl of "getAllCubesList") I output the results as a 2D-array. I did the same thing with the POST request; converting a JSON object into a 2D-array.

To convert the 2D-array into CSV format, I wrote a mini "viewer" program to .join(",") each row of the 2d-array and did "console.log(theRow)" for each row. To save the output to a file, run the viewer program and redirect the standard output to a file:

### *step0*
```
curl https://www150.statcan.gc.ca/t1/wds/rest/getAllCubesList > ./input_files/all.js
```
### *step0a* 
make the file a module for use in next step (see above for details)

### *step1* 
```
node boom.js > output_file/boomOutput.js
```
### *step1a* 
make the file a module for use in next step

### *step2*
```
node viewBoom.js > finalBoom.csv
 ```
"boom.js" takes input from "./input_files/list.js" and "./input_files/all.js" (list of IDs and the Big List that I "curled").
"viewBoom.js" takes input from the output of "boom.js".

Getting the geography goes as follows:

### *step0*
```
node asyncPost.js > output_files/asyncOutput.js
```
### *step0a* 
make the file a module for use in next step
### *step1*
```
node asyncPost\(pp\).js > output_files/ppPost.js
```
### *step1a* 
make the file a module for use in next step

### *step2*
```
node viewPPPOST.js > output_files/finalAsync.js
```
"asyncPost.js" takes input from "./input_files/list.js" (list of IDs).
"asyncPost(pp).js" takes input from the output of "asyncPost.js".
"viewPPPOST.js" takes input from the output of "asyncPost(pp).js".
