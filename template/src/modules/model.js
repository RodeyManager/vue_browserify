
;(function(){
    'use strict';

    const defuletConfig = {
        baseURI: App.getHosts(),
        validateStatus: status => String(status) === '200'
    };

    class APPModel{

        constructor(config){
            this.config = Object.assign(defuletConfig, App, config);
            this.ajax = axios.create(config);
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

    }

    this['APPModel'] = new APPModel();

}).call(this || window);

