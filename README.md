# JSON subsetting
We'd like to extract info from a big list, according to a smaller list of ID numbers.
So we'll get most of the information we need for the small list, just by doing a big GET request followed by subsetting with a NodeJs program (boom.js).

Big list is the result of a GET request for "getAllCubesList" and the small list consists of a subset of Labour Force Survey standard tables.

We would like the titles for each productId, in both languages, along with a few other metadata (see input-files/list.js).

This first part is done with boom.js and list.js.

Developper resources for GET request: https://www.statcan.gc.ca/eng/developers/wds/user-guide#a11-4

# Restful client that fetches geography

The geo needs to be extracted from a "cubeMetadata" POST request. One request per productId, followed by subsetting, and outputing to .csv format.

This second part is done with asyncPost.js and list.js.

Since the information is repeated in both resources, we can verify our results.

Developper resources for POST request: https://www.statcan.gc.ca/eng/developers/wds/user-guide#a11-1

# NodeJs environment and Statcan Web Data Service

Once you've cloned this repo, you should run ' npm install ' to fetch the project dependencies (see package.json).

Here's a link to the main developper resource: https://www.statcan.gc.ca/eng/developers/wds
