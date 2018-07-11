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
		file.getBatsmanScored6(dataset).then(function(data){
			expect(data).equal(expectedOutput);
		}).catch(function(err){})
	});

/* Checking whething file is empty or not */
	it('check valid file - non empty csv file', async function(){
		const dataset = path.resolve('test/sampleCSV/emptyCSV.csv');
		const expectedOutput = {};
		file.topTenSixesScorers(dataset).then(function(data){
			expect(data).equal(expectedOutput);
		}).catch(function(err){})
	});

/* Checking generated output equals desired output */
	xit('Checking generated output equals desired output', (done) => {
		const dataset = path.resolve('test/sampleCSV/sampleMatches.csv');
		const expectedOutput = {
			2008: {
				'Rising Pune Supergiant': 1,
				'Sunrisers Hyderabad': 1
			},
			2009: {
				'Kolkata Knight Riders': 1
			},
			2010: {
				'Chennai Super Kings': 2,
				'Kings XI Punjab': 1,
				'Mumbai Indians': 1,
				'Royal Challengers Bangalore': 1
			},
			2017: {
				'Royal Challengers Bangalore': 1,
				'Sunrisers Hyderabad': 1
			},
		};
		file.getBatsmanScored6(dataset).then(function(data){
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