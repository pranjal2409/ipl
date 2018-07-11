/******************** 2016 extra runs conceded per team ********************/

const path = require('path');
const matches = path.resolve('../csv/matches.csv');
const deliveries = path.resolve('../csv/deliveries.csv');

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
    createJSON('../json/extra/RunsConcededIn2016.json', extraRuns);
});

module.exports = {
    getMatchId2016: getMatchId2016,
    get2016BowlingTeams: get2016BowlingTeams
}