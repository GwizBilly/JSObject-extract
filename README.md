# JSON subsetting
extract from big list according to small list of ID numbers
to get most of the information we need for the small list.

Big list is the result of "getAllCubesList" and small list consists of a subset of Labour Force Survey standard tables.

We would like the titles of the tables in both languages, along with a few other metadata (see input-files/list.js).

This first part is done with Boom.js.

Developper resources for GET request: https://www.statcan.gc.ca/eng/developers/wds/user-guide#a11-4

# Restful client that fetches geography

The geo needs to be extarcted from a "cubeMetadata" POST request.

This second part is done with asyncPost.js.

Developper resources for POST request: https://www.statcan.gc.ca/eng/developers/wds/user-guide#a11-1

# NodeJs environment and Statcan Web Data Service

Once you've cloned this repo, you should run ' npm install ' to fetch the dependencies.

Here's a link to the main developper resource: https://www.statcan.gc.ca/eng/developers/wds
