'use strict';

const Hello = require('../../components/hello.vue');

new Vue({
    el: '#hello',
    render: h => h(Hello),
    created(){
        let $message = document.querySelector('#message');
        let textAjax = APPModel.test({ name: 'gupack' }, { method: 'POST' });
        textAjax.then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });

        APPModel.test.get().then(res => {
            console.log(res)
        });

        APPModel.test.post().then(res => {
            console.log(res)
        });

    }
});