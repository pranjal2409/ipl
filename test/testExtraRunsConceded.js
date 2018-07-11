/***** Test File for Finding Number of Matches Per Years *****/

/* Global Variables */
const expect = require('chai').expect;
const path = require('path');
const file = require('../js/stats.js');

/* Describe */
describe('Extra runs conceded by each team in season 2016', function(){

/* should not allow empty files to read */
	it('should not allow empty files to read - matches csv', async function(){
		const dataset = path.resolve('test/sampleCSV/emptyCSV.csv');
		const expectedOutput = {};
		file.getMatchId2016(dataset).then(function(data){
			expect(data).equal(expectedOutput);
		}).catch(function(err){})
	});

/* should not allow empty files to read */
	it('should not allow empty files to read - deliveries csv', async function(){
		const dataset = path.resolve('test/sampleCSV/emptyCSV.csv');
		const expectedOutput = {};
		file.get2016BowlingTeams(dataset).then(function(data){
			expect(data).equal(expectedOutput);
		}).catch(function(err){})
	});

/* Checking whether their is null entries or undefined entries or not */
	it('should not allow null data to be entered', function(done){
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
	it('should return only integer values for years', function(done){
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
});