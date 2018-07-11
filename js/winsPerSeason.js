/******************** Number of Matches Won by Teams Per Season ********************/

const path = require('path');
const matches = path.resolve('../csv/matches.csv');
const deliveries = path.resolve('../csv/deliveries.csv');

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

module.exports = {
    winsPerYear: winsPerYear
}