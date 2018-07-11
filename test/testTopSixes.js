/***** Test File for Finding Number of Matches Per Years *****/

/* Global Variables */
const expect = require('chai').expect;
const path = require('path');
const file = require('../js/stats.js');

/* Describe */
describe('Top ten batsman scored 6 runs', function(){

/* should not allow empty files to read */
	it('should not allow empty files to read', async function(){
		const dataset = path.resolve('test/sampleCSV/emptyCSV.csv');
		const expectedOutput = {};
		file.getBatsmanScored6(dataset).then(function(data){
			expect(data).equal(expectedOutput);
		}).catch(function(err){})
	});

/* should not allow empty files to read */
	it('should not allow empty files to read', async function(){
		const dataset = path.resolve('test/sampleCSV/emptyCSV.csv');
		const expectedOutput = {};
		file.topTenSixesScorers(dataset).then(function(data){
			expect(data).equal(expectedOutput);
		}).catch(function(err){})
	});
});