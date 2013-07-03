node-gcs
==============

Node.js wrapper for Google Cloud Storage API v2.0

Installation
------------

        npm install node-gcs

Usage
-----
A new <a href="https://github.com/bsphere/node-gapitoken" target="_blank">gapitoken</a> object should be created and passed to the constructor of node-gcs

    var GAPI = require('node-gcs').gapitoken;
    var GCS = require('node-gcs');
    var fs = require('fs');

    var gapi = new GAPI(gapitoken-options, function(err) {
        if (err) { console.log(err); }
    
        var gcs = new GCS(gapi);
     
        fs.stat('./test.jpg', function(err, stats) {
    	    if (err) { return console.log(err); }
    	
    	    var file = fs.createReadStream('./test.jpg');
    	
    	    var headers = {
    	        'Content-Length': stats.size,
                'Content-Type': 'Image/jpeg',
                'x-goog-acl': 'public-read'		
    	    };

    	    gcs.putStream(file, '<BUCKET NAME>', '/test.jpg', headers, function(err, res) {
    		    console.log(err, res);
    	    });
        });
    });    
    
    
NOTE: see https://developers.google.com/storage/docs/authentication for possible scope options

Supported Methods
----------------
Currently the supported methods are:

        putStream(stream, bucket, filepath, headers, callback);
        deleteFile(bucket, filepath, callback);
