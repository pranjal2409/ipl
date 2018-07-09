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
    console.log(chart1);
        var chart = new CanvasJS.Chart("chartContainer1", {
            exportEnabled: true,
            animationEnabled: true,
            title:{
                text: "Number of Matches Per Season"
            },
            subtitles: [{
                text: "2008-2017"
            }], 
            axisX: {
                title: "Season"
            },
            axisY: {
                title: "Number of Matches",
                titleFontColor: "#4F81BC",
                lineColor: "#4F81BC",
                labelFontColor: "#4F81BC",
                tickColor: "#4F81BC"
            },
            axisY2: {
                titleFontColor: "#C0504E",
                lineColor: "#C0504E",
                labelFontColor: "#C0504E",
                tickColor: "#C0504E"
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer"
            },
            data: [{
                type: "column",
                showInLegend: true, 
                dataPoints: chart1
            }]
        });
        chart.render();
    }

createMatchesPerYearCharts();