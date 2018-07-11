/******************** Number of Matches Per Year ********************/

const path = require('path');
const matches = path.resolve('../csv/matches.csv');
const deliveries = path.resolve('../csv/deliveries.csv');

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
    createJSON('../json/matchesPerYear.json', totalMatchesPerSeason);
});

module.exports = {
    matchesPerYear: matchesPerYear
}