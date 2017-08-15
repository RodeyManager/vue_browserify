'use strict';

const Hello = require('../../components/hello.vue');
const AppService = require('../../services/app.service');
const TestService = require('../../services/test.service');

new Vue({
    el: '#hello',
    render: h => h(Hello),
    created(){

        let testService = new TestService();
        testService.getTestData().then(data => console.log(data));

        AppService.test({ name: 'gupack' }, { method: 'POST' })
        .then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });

        AppService.test.get().then(res => {
            console.log(res.data)
        });

        AppService.test.post().then(res => {
            console.log(res.data)
        });

    }
});