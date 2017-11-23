'use strict';

const
    path         = require('path'),
    babelify     = require('babelify'),
    vueify       = require('vueify'),
    extractCss   = require('vueify/plugins/extract-css'),
    env          = require('./config/app-env');

const
    //静态资源版本控制号
    vQueryKey = '_rvc_',
    hashSize = 10;

//导出模块
module.exports      =  {
    env: env.name,
    // 源文件路径, 默认为 src
    sourceDir: env.source.path,
    // 编译产出路径，可以是绝对或者相对路径，默认为 build
    buildDir: env.dest.path,
    // 默认启动地址
    indexFile: 'views/index.html',
    // 每次执行编译之前是否清理当前编译目录
    startClean: true,
    // 静态资源CDN配置
    statics: {
        _if: false,
        // 需要匹配替换的文件后缀
        // testExt: /^\.(html|tpl|jade|md|css|scss|less|styl|vue|jsx)[^\.]*$/i,
        hostname: 'http://esales.cignacmb.com/',
        nodes: [
            { extname: /^\.(png|jpg|jpeg|gif|bmp|ico|webpng)[^\.]*$/i, pathname: 'pic', hostname: 'http://image.cdn.com' },
            { extname: /^\.(otf|eot|svg|ttf|woff2?)[^\.]*$/i, pathname: 'fonts-api' },
            { extname: /^\.(js?)[^\.]*$/i, pathname: 'scripts', hostname: 'http://js.cdn.com' }
        ]
    },
    port: 3000,
    // task任务列表
    buildTasks: {
        // ---说明：单个任务配置
        'build.css': {
            // 源文件
            src: [
                'assets/css/reset.css',
                'assets/css/**/*'
            ],
            // 额外的插件样式，如果不是每个页面都用到，不建议合并到主样式文件中
            // 可以单独在使用到的页面中引用
            plugins: [],
            dest: 'assets/css',
            // 依赖task列表
            rely: ['build.assets'],
            // gulp插件
            loader: cssLoaders('app.min.css'),
            // 监听变化（文件改变执行该任务）
            watch: ['assets/css/**/*']
        },

        'build.assets': {
            src: 'assets/{fonts,images,js,libs}/**/*',
            filters: [],
            dest: 'assets',
            loader: jsLoaders()
        },

        'build.libs': {
            src: [
                path.resolve(__dirname, 'node_modules/axios/dist/axios.min.js'),
                path.resolve(__dirname, 'node_modules/vue/dist/vue.min.js')
            ],
            dest: 'assets/js',
            loader: Object.assign({
                'gulp-concat': 'libs.js'
            }, jsLoaders())
        },

        'build.views': {
            src: ['views/**/*.html'],
            filters: [],
            rely: [
                'build.css',
                'build.libs',
                'build.modules.views'
            ],
            dest: 'views',
            loader: htmlLoaders(),
            watch: [
                'views/**/*',
                'components/**/*',
                'templates/**/*'
            ]
        },
        
        'build.modules.views': {
            src: 'modules/**/*View.js',
            dest: 'modules',
            //依赖task列表
            rely: ['build.assets'],
            loader: {
                'gulp-browserify-multi-entry': {
                    debug: !env.isIf,
                    transform: [ vueify, babelify ],
                    plugin: [
                        [ extractCss, {
                            out: path.join(env.dest.path, 'assets/css/components.min.css')
                        }],
                    ]
                },
                'gulp-jsminer': {
                    _if: env.isProduction,
                    preserveComments: '!'
                }
            },
            watch: [ 'assets/js/**/*', 'components/**/*', 'modules/**/*', 'config/**/*', 'services/**/*' ]
        }

    },
    // 发布配置
    deploy: [
        {
            isExecute: false,
            host: '192.168.233.130',
            user: 'root',
            pass: 'root123',
            port: 22,
            timeout: 50000,
            // localPath: path.join(__dirname, '../build/**/*'),
            filters: [],
            remotePath: '/var/www/app',
            onUploadedComplete: function(){
                console.log('-----上传完成-----');
            }
        }
    ]

};

function cssLoaders(fileName){
    return {
        'gulp-merge-css': { fileName: fileName },
        'gulp-recache': recache(env.dest.path + '/assets'),
        'gulp-autoprefixer': {
            browsers: ['> 5%', 'IE > 8', 'last 2 versions']
        },
        'gulp-uglifycss': { _if: env.isProduction }

    }
}

function jsLoaders(){
    return {
        'gulp-jsminer': {
            _if: env.isProduction,
            preserveComments: '!'
        }
    }
}

function htmlLoaders(){
    return {
        'gulp-tag-include': { compress: env.isProduction },
        'gulp-recache': recache(env.dest.path)
    }
}

function recache(path){
    return {
        _if: env.isIf,
        queryKey: vQueryKey,
        // hash值长度
        hashSize: hashSize,
        // 控制字节大小以内的图片转base64,
        toBase64Limit: 1000,
        basePath: path
    }
}
