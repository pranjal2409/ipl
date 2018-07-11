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

function createMatchesPerYearCharts(){
    let chart1 = loadJSON('../json/matchesPerYear.json');
    var chart = new CanvasJS.Chart("chartContainer1", {
        animationEnabled: true,
        theme: "light1", 
        title:{
            text: "Matches Per Season"
        },
        axisY: {
            title: "Matches"
        },
        data: [{        
            type: "column",  
            legendMarkerColor: "grey",
            dataPoints: chart1
        }]
    });
    chart.render();
}

function createWinsOfTeamsPerSeason(){

    let chart2 = loadJSON('../json/teamWinsPerSeason.json');
    let team = [];
    let record = [];
    let inputData = [];
    for(let key in chart2){
        for(let k in chart2[key]){
            team.push(k);
            record.push(chart2[key][k]);
        }
    }
    for(let i = 0; i < team.length; i++){
        let obj = {
            type: "stackedBar",
            name: team[i],
            showInLegend: "true",
            dataPoints: record[i]
        }
        inputData.push(obj);
    }
    var chart = new CanvasJS.Chart("chartContainer2", {
        animationEnabled: true,
        theme: "light1",
        title:{
            text: "Team Wins Per Season",
            fontSize: 40
        },
        toolTip: {
            shared: true
        },
        legend:{
            cursor: "pointer",
            itemclick: toggleDataSeries
        },
        data: inputData
    });
    chart.render();
    
    function toggleDataSeries(e) {
        if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }    
}

function createExtraRunsConceded(){
    let chart3 = loadJSON('../json/extraRunsConcededIn2016.json');
    var chart = new CanvasJS.Chart("chartContainer3", {
        animationEnabled: true,
        theme: "light1", 
        title:{
            text: "Wins Per Season"
        },
        axisY: {
            title: "Matches Won"
        },
        data: [{        
            type: "column",  
            legendMarkerColor: "grey",
            dataPoints: chart3
        }]
    });
    chart.render();
}

function createTopTenEconomicalBowlers(){
    let chart4 = loadJSON('../json/topTenEconomicalBowlers.json');
    var chart = new CanvasJS.Chart("chartContainer4", {
        animationEnabled: true,
        theme: "light1", 
        title:{
            text: "Top Ten Economical Bowlers"
        },
        axisY: {
            title: "Economy Rate"
        },
        data: [{        
            type: "column",  
            legendMarkerColor: "grey",
            dataPoints: chart4
        }]
    });
    chart.render();
}

function createTopSixesScorers(){
    let chart5 = loadJSON('../json/topTenSixesScorers.json');
    var chart = new CanvasJS.Chart("chartContainer5", {
        animationEnabled: true,
        theme: "light1", 
        title:{
            text: "Top Ten Sixes Scorers"
        },
        axisY: {
            title: "Sixes"
        },
        data: [{        
            type: "column",  
            legendMarkerColor: "grey",
            dataPoints: chart5
        }]
    });
    chart.render();
}

createMatchesPerYearCharts();
createWinsOfTeamsPerSeason();
createExtraRunsConceded();
createTopTenEconomicalBowlers();
createTopSixesScorers();