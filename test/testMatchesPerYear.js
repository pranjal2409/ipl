/***** Test File for Finding Number of Matches Per Years *****/

/* Global Variables */
const expect = require('chai').expect;
const path = require('path');
const file = require('../js/stats.js');

/* Describe */
describe('Matches Per Season', function(){

/* Checking whething file is empty or not */
	it('should not allow empty files to read', async function(){
		const dataset = path.resolve('test/sampleCSV/emptyCSV.csv');
		const expectedOutput = {};
		file.matchesPerYear(dataset).then(function(data){
			expect(data).equal(expectedOutput);
		}).catch(function(err){})
	});

/* Checking whether their is null entries or undefined entries or not */
	it('should not allow null data to be entered', function(done){
		const dataset = path.resolve('test/sampleCSV/nullEntries.csv');
		const expectedOutput = {
			2008: 2,
			2010: 1,
			2011: 2,
			2013: 4,
			2016: 11,
			2017: 1
		};
		file.matchesPerYear(dataset).then(function(data){
			try{
				expect(data).to.deep.equal(expectedOutput);
				done();
			}
			catch(e){
				done(e);
			}
		});		
	});

/* Checking whether entries are in integer format or string format */
	it('should return only integer values for years', function(done){
		const dataset = path.resolve('test/sampleCSV/validFormat.csv');
		const expectedOutput = {
			2008: 1,
			2009: 1,
			2016: 9,
			2017: 3
		};
		file.matchesPerYear(dataset).then(function(data){
			try{
				expect(data).to.deep.equal(expectedOutput);
				done();
			}
			catch(e){
				done(e);
			}
		});		
	});

/* checking whether desired output is been generated or not */
	it('should return the number of matches played per season', function(done){
		const dataset = path.resolve('test/sampleCSV/sampleMatches.csv');
		const expectedOutput = {
			2008: 2,
			2009: 1,
			2010: 5,
			2017: 2
		};
		file.matchesPerYear(dataset).then(function(data){
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