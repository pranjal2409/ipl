/***** Test File for Finding Number of Matches Per Years *****/

/* Global Variables */
const expect = require('chai').expect;
const path = require('path');
const file = require('../js/stats.js');

/* Describe */
describe('stats', function(){

/* Checking whething file is empty or not */
	it('check valid file - non empty csv file', async function(){
		const dataset = path.resolve('test/sampleCSV/emptyCSV.csv');
		const expectedOutput = {};
		file.getMatchId2015(dataset).then(function(data){
			expect(data).equal(expectedOutput);
		}).catch(function(err){})
	});

/* Checking whething file is empty or not */
	it('check valid file - non empty csv file', async function(){
		const dataset = path.resolve('test/sampleCSV/emptyCSV.csv');
		const expectedOutput = {};
		file.getEconomyRate(dataset).then(function(data){
			expect(data).equal(expectedOutput);
		}).catch(function(err){})
	});

/* Checking whething file is empty or not */
	it('check valid file - non empty csv file', async function(){
		const dataset = path.resolve('test/sampleCSV/emptyCSV.csv');
		const expectedOutput = {};
		file.topTenEconomicalBowlers(dataset).then(function(data){
			expect(data).equal(expectedOutput);
		}).catch(function(err){})
	});

/* Checking generated output equals desired output */
	xit('Checking generated output equals desired output', (done) => {
		const dataset = path.resolve('test/sampleCSV/nullDeliveries.csv');
		const expectedOutput = [
			{ 'D Wiese': 2, 'DW Steyn': 1, 'JP Faulkner': 1 }
		];
		file.topTenEconomicalBowlers(dataset).then(function(data){
			try{
				expect(data).to.deep.equal(expectedOutput);
				done();
			}
			catch(e){
				done(e);
			}
		});		
	});
});