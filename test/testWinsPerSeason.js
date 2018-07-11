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
		file.winsPerYear(dataset).then(function(data){
			expect(data).equal(expectedOutput);
		}).catch(function(err){})
	});

/* Checking whether their is null entries or undefined entries or not */
	it('check valid inputs - not null entries', (done) => {
		const dataset = path.resolve('test/sampleCSV/nullEntries.csv');
		const expectedOutput = {
			2008: {
				'Sunrisers Hyderabad': 1,
				'Rising Pune Supergiant' : 1
			},
			2010: {
				'Kings XI Punjab': 1
			},
			2011: {
				'Chennai Super Kings': 2
			},
			2013: {
				'Kolkata Knight Riders': 1,
				'Royal Challengers Bangalore': 1,
				'Mumbai Indians': 1
			},
			2016: {
				"Delhi Daredevils": 1,
     			"Gujarat Lions": 2,
     			"Kolkata Knight Riders": 1,
     			"Rising Pune Supergiants": 1,
     			"Royal Challengers Bangalore": 3,
     			"Sunrisers Hyderabad": 3
			}
		};
		file.winsPerYear(dataset).then(function(data){
			try{
				expect(data).to.deep.equal(expectedOutput);
				done();
			}
			catch(e){
				done(e);
			}
		});		
	});

/* Checking entries format - season format integer */
	it('check valid inputs - season format integer', (done) => {
		const dataset = path.resolve('test/sampleCSV/validFormat.csv');
		const expectedOutput = {
			2008: {
				'Sunrisers Hyderabad': 1
			},
			2009: {
				'Kolkata Knight Riders': 1
			},
			2016: {
				"Delhi Daredevils": 1,
     			"Gujarat Lions": 2,
     			"Kolkata Knight Riders": 1,
     			"Royal Challengers Bangalore": 3,
     			"Sunrisers Hyderabad": 2
			},
			2017: {
				'Royal Challengers Bangalore': 2,
				'Sunrisers Hyderabad': 1
			},
		};
		file.winsPerYear(dataset).then(function(data){
			try{
				expect(data).to.deep.equal(expectedOutput);
				done();
			}
			catch(e){
				done(e);
			}
		});		
	});

/* Checking generated output equals desired output */
	it('Checking generated output equals desired output', (done) => {
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
		file.winsPerYear(dataset).then(function(data){
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