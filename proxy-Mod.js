const read = require('read-file');
const bearer_token = read.sync('/var/run/proxy/bearer.txt', { normalize: true }).replace(/[^0-9a-z_.-]/gi, '')

module.exports = {
    *beforeSendRequest(requestDetail) {

        // we expect incoming requests in the form http://<>:5050/https://web.example.com/etc ...
        // constructing a new URL object is more expensive than using a regex but safer

        let url = new URL(requestDetail.url.toString().replace('https://localhost:5050/'));
        let newRequestOptions = requestDetail.requestOptions;

        newRequestOptions.hostname = url.hostname;
        newRequestOptions.path = url.pathname + url.search;
        newRequestOptions.port = 443;

        if (requestDetail.url.includes('protectionKey')) {
            newRequestOptions.headers['authorization'] = 'Bearer ' + bearer_token;
            console.log('Added bearer token to request:', requestDetail.url);
        }
        return {
            requestOptions: newRequestOptions
        };
    }
};
