var request = require('request');

var GCS = function(gapi) {
	this.gapi = gapi;
};

GCS.prototype.putStream = function(stream, bucket, filepath, headers, callback) {
    stream.pause();
    this.gapi.getToken(function(err, token) {
        if (err) { return callback(err); }

        headers.Authorization = 'Bearer ' + token;
        headers.Date = new Date().toString();
        headers.Host = 'storage.googleapis.com';
        headers['x-goog-api-version'] = 2;

        var url = 'http://storage.googleapis.com/' + bucket + filepath;

        stream.resume();
        stream.pipe(request.put(url, {headers: headers}, callback));
    });
};

GCS.prototype.deleteFile = function(bucket, filepath, callback) {
    this.gapi.getToken(function(err, token) {
        if (err) { return callback(err); }

        var headers = {};
        headers.Authorization = 'Bearer ' + token;
        headers.Date = new Date().toString();
        headers.Host = 'storage.googleapis.com';
        headers['Content-Length'] = 0;
        headers['x-goog-api-version'] = 2;

        var url = 'http://storage.googleapis.com/' + bucket + filepath;

        request.del(url, {headers: headers}, callback);
    });
};

module.exports = GCS;
module.exports.gapitoken = require('gapitoken');
