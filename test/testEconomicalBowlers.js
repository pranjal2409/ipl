/***** Test File for Finding Number of Matches Per Years *****/

/* Global Variables */
const expect = require('chai').expect;
const path = require('path');
const file = require('../js/stats.js');

/* Describe */
describe('Top Ten Economical Bowlers of season 2015', function(){

/* should not allow empty files to read */
	it('should not allow empty files to read', async function(){
		const dataset = path.resolve('test/sampleCSV/emptyCSV.csv');
		const expectedOutput = {};
		file.getMatchId2015(dataset).then(function(data){
			expect(data).equal(expectedOutput);
		}).catch(function(err){})
	});

/* should not allow empty files to read */
	it('should not allow empty files to read', async function(){
		const dataset = path.resolve('test/sampleCSV/emptyCSV.csv');
		const expectedOutput = {};
		file.getEconomyRate(dataset).then(function(data){
			expect(data).equal(expectedOutput);
		}).catch(function(err){})
	});

/* should not allow empty files to read */
	it('should not allow empty files to read', async function(){
		const dataset = path.resolve('test/sampleCSV/emptyCSV.csv');
		const expectedOutput = {};
		file.topTenEconomicalBowlers(dataset).then(function(data){
			expect(data).equal(expectedOutput);
		}).catch(function(err){})
	});
});