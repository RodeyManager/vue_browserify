'use strict';

const API = require('./api');

const ENV = 'local';
const protocolReg = /^(https?:)?\/\//i;
let time = ENV === 'local' || ENV === 'dev' ? 5 : 60;
let debug = ENV !== 'prd';
let apiSuffix = ENV === 'local' ? '.json' : '';

let App = {

    // 接口host
    ServerHost: getServerHost(),
    method: 'POST',
    sendTime: time,
    debug: debug,
    apiSuffix: apiSuffix,

    webServiceUrls: API,
    getWebServiceUrl: function(name, host){
        let APINAME = App.webServiceUrls[name];
        return protocolReg.test(APINAME) ? APINAME : App.getHosts((host || App.ServerHost) + APINAME + (App.apiSuffix || ''));
    },
    getHosts: function(page){
        if(protocolReg.test(page) || /^\.+\//.test(page))  return page;
        return location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + (page ? '/' + page : '');
    }

};

function getServerHost(){
    return ENV === 'local' ? '../../src/mockData/' :
            ENV === 'dev' ? 'http://192.168.1.100:9002/app' :
                ENV === 'stg' ? 'test-app/' :
                    ENV === 'prd' ? 'app/' : '';
}

module.exports = App;
