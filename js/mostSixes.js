/******************** Most Sixes Per Season ********************/

const path = require('path');
const matches = path.resolve('../csv/matches.csv');
const deliveries = path.resolve('../csv/deliveries.csv');

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
    createJSON('../json/topTenSixesScorers.json', result);
});

module.exports = {
    getBatsmanScored6: getBatsmanScored6,
    topTenSixesScorers: topTenSixesScorers
}