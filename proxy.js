const AnyProxy = require('anyproxy');

if (!AnyProxy.utils.certMgr.ifRootCAFileExists()) {
    AnyProxy.utils.certMgr.generateRootCA((error, keyPath) => {
        // let users to trust this CA before using proxy
        if (!error) {
            const certDir = require('path').dirname(keyPath);
            console.log('The cert is generated at', certDir);
        } else {
            console.error('error when generating rootCA', error);
        }
    });
}

const options = {
    port: 5050,
    forceProxyHttps: true,
    wsIntercept: false,
    rule: require('./proxy-Mod'),
    silent: false,
    interceptHttps: true,
    type: 'https',
    hostname: 'localhost',
    dangerouslyIgnoreUnauthorized: true,
};

const httpsProxy = new AnyProxy.ProxyServer(options);

httpsProxy.on('error', (e) => {
    console.log('error', e);
});
httpsProxy.start();

// proxyServer.close();
