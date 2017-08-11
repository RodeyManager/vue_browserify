'use strict';

const App = require('../config/app-config');

const defaultConfig = {
    baseURI: App.getHosts(),
    validateStatus: status => String(status) === '200'
};
let instance;

class AppService{

    constructor(){
        this.config = Object.assign(defaultConfig, App);
        this.ajax = axios.create(this.config);
        this._init();
    }

    _init(){
        // 注入api对应方法
        this._injectApis();
    }

    _injectApis(){
        let apis = this.config.webServiceUrls;
        for(let key in apis){
            if(apis.hasOwnProperty(key)){
                let url = this.config.getWebServiceUrl(key);
                this[key] = this._injectObject(url, this._inject(url));
            }
        }
    }

    _injectObject(url, obj){
        let self = this;
        ['get', 'post'].map(method => {
            obj[method] = function(){
                let args = [].slice.call(arguments);
                args.unshift(url);
                return axios[method].apply(self, args);
            };
        });
        return obj;
    }

    _inject(url){
        return (data, options) => {
            let method = (options && options['method'] || 'GET').toLowerCase();
            return this.ajax[method](url, data);
        }
    }

    static getInstance(){
        if(!instance && !(instance instanceof AppService)){
            instance = new AppService();
        }
        return instance;
    }

}

module.exports = AppService.getInstance();