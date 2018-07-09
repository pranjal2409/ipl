function loadJSON(path, error) {

    let charts = [];
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if((this.readyState === 4) && (this.status === 200)){
            charts = JSON.parse(this.responseText);
        }
        else{
            if(error){
                error(xhr);
            }
        }
    }
    xhr.open('GET', path, false);
    xhr.send();
    return charts;
}

/******************** Global Variables ********************/

const path = require('path');
const matches = path.resolve('../csv/matches.csv');
const deliveries = path.resolve('csv/deliveries.csv');

/******************** Number of Matches Per Year ********************/

// matches = path.resolve('csv/matches.csv');
console.log(matches);
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
    for(let key in result){
       let keyObj = {
           x: key,
           y: result[key]
       }
       totalMatchesPerSeason.push(keyObj);
    }
    // require('fs').writeFile('../json/matchesPerYear.json', JSON.stringify(totalMatchesPerSeason, null, 5), (err) => {
    //     if(err){
    //         console.log(err);
    //         return;
    //     }
    //     console.log('File Created');
    // });
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

/******************** Modules for Testing ********************/

module.exports = {
    matchesPerYear: matchesPerYear,
    winsPerYear: winsPerYear
}