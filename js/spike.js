/******************** Global Variables ********************/

const path = require('path');
const matches = path.resolve('../csv/matches.csv');
const deliveries = path.resolve('../csv/deliveries.csv');

/******************** Number of Matches Per Year ********************/

let matchesPerYear = function (matches) {
    return new Promise(function (resolve, reject) {
        let matchesPerSeason = {};
        require('fs').readFile(matches, function (err, data) {
            if (err)
                reject(err);
            else {
                data.toString().split('\n').forEach(function (line, index, arr) {
                    if (index !== 0) {
                        const match = line.split(',');
                        const season = parseInt(match[1]);
                        if (season) {
                            if (matchesPerSeason.hasOwnProperty(season)) {
                                matchesPerSeason[season]++;
                            } else {
                                matchesPerSeason[season] = 1;
                            }
                        }
                    }
                });
            }
            resolve(matchesPerSeason);
        });
    });
}

matchesPerYear(matches).then(function (result) {
    let totalMatchesPerSeason = [];
    for (let key in result) {
        let keyObj = {
            x: key,
            y: result[key]
        }
        totalMatchesPerSeason.push(keyObj);
    }
    // createJSON('../json/matchesPerYear.json', totalMatchesPerSeason);
});

/******************** Number of Matches Won by Teams Per Season ********************/

let winsPerYear = function (matches) {
    return new Promise(function (resolve, reject) {
        let winningTeams = {};
        require('fs').readFile(matches, function (err, data) {
            if (err)
                reject(err);
            else {
                data.toString().split('\n').forEach(function (line, index, arr) {
                    if (index !== 0) {
                        const match = line.split(',');
                        const season = parseInt(match[1]);
                        const winners = match[10];
                        if (season) {
                            if (winners) {
                                if (winningTeams.hasOwnProperty(season)) {
                                    if (winningTeams[season].hasOwnProperty(winners)) {
                                        winningTeams[season][winners]++;
                                    } else {
                                        winningTeams[season][winners] = 1;
                                    }
                                } else {
                                    winningTeams[season] = {};
                                    winningTeams[season][winners] = 1;
                                }
                            }
                        }
                    }
                });
            }
            resolve(winningTeams);
        });
    });
}

winsPerYear(matches).then(function (result) {
    let wins = [];
    for (let key in result) {
        let winArr = [];
        for (let k in result[key]) {
            let winObj = {
                x: k,
                y: result[key][k]
            }
            winArr.push(winObj);
        }
        let temp = key;
        let winObject = {};
        winObject[key] = key;
        winObject[temp] = winArr;
        wins.push(winObject);
    }
    createJSON('../json/teamWinsPerSeasonByYear.json', wins);
});

/******************** 2016 extra runs conceded per team ********************/

let getMatchId2016 = function (matches) {
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
                            if (season === 2016) {
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

let get2016BowlingTeams = function (deliveries) {
    return new Promise(function (resolve, reject) {
        let extraRunsByTeams = {};
        let allTeams = [];
        require('fs').readFile(deliveries, function (err, data) {
            if (err)
                reject(err);
            else {
                getMatchId2016(matches).then(function (result) {
                    const firstMatchId = result[0];
                    const lastMatchId = result[result.length - 1];
                    data.toString().split('\n').forEach(function (line, index, arr) {
                        if (index !== 0) {
                            const delivery = line.split(',');
                            const deliveryId = delivery[0];
                            if (deliveryId) {
                                if ((deliveryId >= firstMatchId) && (deliveryId <= lastMatchId)) {
                                    const bowlingTeam = delivery[3];
                                    const extras = parseInt(delivery[16]);
                                    if ((bowlingTeam) && (extras)) {
                                        if (extras !== 0) {
                                            if (extraRunsByTeams.hasOwnProperty(bowlingTeam)) {
                                                if (extraRunsByTeams[bowlingTeam].hasOwnProperty(extras)) {
                                                    extraRunsByTeams[bowlingTeam][extras] += extras;
                                                }
                                                else {
                                                    extraRunsByTeams[bowlingTeam][extras] = 1;
                                                }
                                            }
                                            else {
                                                extraRunsByTeams[bowlingTeam] = {};
                                                extraRunsByTeams[bowlingTeam][extras] = 1;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    });
                    resolve(extraRunsByTeams);
                });
            }
        });
    });
}

get2016BowlingTeams(deliveries).then(function (res1) {
    let extraRuns = [];
    for (let key in res1) {
        let extras = 0;
        for (let k in res1[key]) {
            extras += res1[key][k];
        }
        let extraObj = {
            y: extras,
            label: key
        }
        extraRuns.push(extraObj);
    }
    // createJSON('../json/extra/RunsConcededIn2016.json', extraRuns);
});

/******************** 2015 Economical Bowlers ********************/

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
            result.sort(function (a, b) {
                return a.economy - b.economy;
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
    // console.log(result);
});

topTenEconomicalBowlers(deliveries).then(function (result) {
    // console.log(result)
    // createJSON('../json/topTenEconomicalBowlers.json', result);
});

/******************** Most Sixes Per Season ********************/

let getBatsmanScored6 = function (deliveries) {
    return new Promise(function (resolve, reject) {
        let batsmanScoredSix = {};
        let batsmanInfo = [];
        require('fs').readFile(deliveries, function (err, data) {
            if (err)
                reject(err);
            else {
                matchesPerYear(matches).then(function (matRes) {
                    let k = 1;
                    let temp = Object.values(matRes)[k];
                    data.toString().split('\n').forEach(function (line, index, arr) {
                        if (index !== 0) {
                            const delivery = line.split(',');
                            const ids = parseInt(delivery[0]);
                            const batsman = delivery[6];
                            const sixes = parseInt(delivery[15]);
                            if (ids) {
                                if (sixes === 6) {
                                    if (batsmanScoredSix.hasOwnProperty(batsman)) {
                                        batsmanScoredSix[batsman]++;
                                    }
                                    else {
                                        batsmanScoredSix[batsman] = 1;
                                    }
                                }
                            }
                        }
                    });
                    resolve(batsmanScoredSix);
                });
            }
        });
    });
}

let topTenSixesScorers = function (deliveries) {
    return new Promise(function (resolve, reject) {
        let topSixesScorers = [];
        let sixesScorers = [];
        getBatsmanScored6(deliveries).then(function (result) {
            for (let keys in result) {
                let obj = {
                    label: keys,
                    y: result[keys]
                }
                sixesScorers.push(obj);
            }
            sixesScorers.sort(function (a, b) {
                return a.sixes - b.sixes;
            });
            for (let six = sixesScorers.length - 1; six > sixesScorers.length - 11; six--) {
                topSixesScorers[six] = sixesScorers[six];
            }
            resolve(topSixesScorers.reverse());
        });
    });
}

topTenSixesScorers(deliveries).then(function (result) {
    // createJSON('../json/topTenSixesScorers.json', result);
});

function createJSON(file, dataset) {
    require('fs').writeFile(file, JSON.stringify(dataset, null, 5), (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('File Created');
    });
}

module.exports = {
    createJSON: createJSON
}