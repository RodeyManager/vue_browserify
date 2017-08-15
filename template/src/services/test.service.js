'use strict';

const
	AppService = require('./app.service');

export default class TestService{
	constructor(){}

	getTestData(){
		return AppService.test().then(res => res.data.data).catch(this.error.bind(this));
	}

	error(err){
		console.log(err);
	}

}