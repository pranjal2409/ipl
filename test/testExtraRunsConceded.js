/***** Test File for Finding Number of Matches Per Years *****/

/* Global Variables */
const expect = require('chai').expect;
const path = require('path');
const file = require('../js/stats.js');

/* Describe */
describe('stats', function(){

/* Checking whething file is empty or not */
	it('check valid file - non empty csv file - matches', async function(){
		const dataset = path.resolve('test/sampleCSV/emptyCSV.csv');
		const expectedOutput = {};
		file.getMatchId2016(dataset).then(function(data){
			expect(data).equal(expectedOutput);
		}).catch(function(err){})
	});

/* Checking whething file is empty or not */
	it('check valid file - non empty csv file - deliveries', async function(){
		const dataset = path.resolve('test/sampleCSV/emptyCSV.csv');
		const expectedOutput = {};
		file.get2016BowlingTeams(dataset).then(function(data){
			expect(data).equal(expectedOutput);
		}).catch(function(err){})
	});

/* Checking whether their is null entries or undefined entries or not */
	it('check valid inputs - null entries - matches csv', function(done){
		const dataset = path.resolve('test/sampleCSV/nullEntries.csv');
		const expectedOutput = [626, 627, 629, 631, 632, 633, 635, 636];
		file.getMatchId2016(dataset).then(function(data){
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
	it('check valid inputs - integer format', function(done){
		const dataset = path.resolve('test/sampleCSV/validFormat.csv');
		const expectedOutput = [627, 628, 631, 633, 636];
		file.getMatchId2016(dataset).then(function(data){
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
	it('check correct output', function(done){
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