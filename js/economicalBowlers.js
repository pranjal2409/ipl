/******************** 2015 Economical Bowlers ********************/

const path = require('path');
const matches = path.resolve('../csv/matches.csv');
const deliveries = path.resolve('../csv/deliveries.csv');

let getMatchId2015 = function (matches) {
    return new Promise(function (resolve, reject) {
        let matchIds = [];
        require('fs').readFile(matches, function (err, data) {
            if (err)
                reject(err);
            else {
                data.toString().split('\n').forEach(function (line, index, arr) {
                    if (index !== 0) {
                        const match = line.split(',');
                        const season = parseInt(match[1]);
                        const ids = parseInt(match[0]);
                        if ((season) && (ids)) {
                            if (season === 2015) {
                                matchIds.push(ids);
                            }
                        }
                    }
                });
            }
            resolve(matchIds);
        });
    });
}

let getEconomyRate = function (deliveries) {
    return new Promise(function (resolve, reject) {
        let allBowls = {};
        let allRuns = {};
        let bowlersEconomy = [];
        require('fs').readFile(deliveries, function (err, data) {
            if (err)
                reject(err);
            else {
                getMatchId2015(matches).then(function (result) {
                    const firstMatchId = result[0];
                    const lastMatchId = result[result.length - 1];
                    data.toString().split('\n').forEach(function (line, index, arr) {
                        if (index !== 0) {
                            const delivery = line.split(',');
                            const deliveryId = delivery[0];
                            let obj = {};
                            if (deliveryId) {
                                if ((deliveryId >= firstMatchId) && (deliveryId <= lastMatchId)) {
                                    const bowler = delivery[8];
                                    const ball = parseInt(delivery[5]);
                                    const wideBall = parseInt(delivery[10]);
                                    const noBall = parseInt(delivery[13]);
                                    if (allBowls.hasOwnProperty(bowler)) {
                                        if ((wideBall === 0) && (noBall === 0)) {
                                            allBowls[bowler]++
                                        }
                                    }
                                    else {
                                        allBowls[bowler] = 1;
                                    }
                                }
                                if ((deliveryId >= firstMatchId) && (deliveryId <= lastMatchId)) {
                                    const bowler = delivery[8];
                                    const runs = parseInt(delivery[17]);
                                    let run = 0;
                                    if (allRuns.hasOwnProperty(bowler)) {
                                        allRuns[bowler] += runs;
                                    }
                                    else {
                                        allRuns[bowler] = 1;
                                    }
                                }
                            }
                        }
                    });
                    for (let keyBall in allBowls) {
                        for (let keyRun in allRuns) {
                            if (keyBall === keyRun) {
                                let economy = ((allRuns[keyRun] / allBowls[keyBall]) * 6).toFixed(2);
                                let economyObj = {
                                    label: keyBall,
                                    eco: economy
                                }
                                bowlersEconomy.push(economyObj);
                            }
                        }
                    }
                    resolve(bowlersEconomy);
                });
            }
        });
    });
}

let topTenEconomicalBowlers = function (deliveries) {
    return new Promise(function (resolve, reject) {
        getEconomyRate(deliveries).then(function (result) {
            result.sort(function (economy1, economy2) {
                return economy1.economy - economy2.economy;
            });
            let topTen = [];
            for (let bowler = 0; bowler < 10; bowler++) {
                topTen[bowler] = result[bowler];
            }
            resolve(topTen);
        });
    });
}

getMatchId2015(matches).then(function(result){
});

topTenEconomicalBowlers(deliveries).then(function (result) {
    createJSON('../json/topTenEconomicalBowlers.json', result);
});

module.exports = {
    getMatchId2015: getMatchId2015,
    getEconomyRate: getEconomyRate,
    topTenEconomicalBowlers: topTenEconomicalBowlers
}