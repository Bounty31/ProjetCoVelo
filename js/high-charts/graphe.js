var chart;
var chartOptions;
var chart_data;
var axisIndex = 0;
var oppositeBool = false;
var editState = false;
var numberPlotLines = 0;
var markers = [];
var sections = [];
var hiddenSections;
var shownSections;
var hiddenVisuSections;
var currentTraceId = 1;

// Colors for both series
var colors = ["#C41232", "#0E79DC"];
var fillColors = {
    0: ["rgba(196, 18, 50, 1)", "rgba(196, 18, 50, 0.2)"],
    1: ["rgba(14, 121, 220, 1)", "rgba(14, 121, 220, 0.2)"]
};

// Options : altitude, vitesse, freq_cardiaque, puissance, freq_pedalage
// Default chart options
var optionsArray = ["altitude", "vitesse"];

function initializeGraph() {
    console.log("- Initializing chart");

    chartOptions = {
        chart: {
            zoomType: 'x',
            renderTo: 'Graph-1',
            type: 'spline'
        },
        title: {
            text: 'Altitude'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                'Cliquez et laissez enfoncé pour zoomer' : 'Maintenez enfoncé la souris et déplacez la pour zoomer'
        },
        yAxis: [{}, {}],
        legend: {
            enabled: true,
            navigation: {
                activeColor: '#C41232'
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        }
    };

    chart = new Highcharts.Chart(chartOptions);

    // Distance sur l'axe x
    chart.xAxis[0].update({
        type: 'number',
        title: {
            text: 'Distance parcourue'
        },
        labels: {
            formatter: function () {
                if (this.value == 0) {
                    return this.value + 'km';
                }
                else {
                    return this.value.toString().slice(0, -3) + 'km';
                }
            }
        }
    });
}

function addSerie(name, dataName) {
    var filteredSerie = filtreSerie(dataName);

    chart.addSeries({
        events: {
            click: function (evt) {
                if (editState) {
                    var xValue = evt.point.x;
                    var pointIndex = evt.point.index;

                    var plotId = "plotline-" + numberPlotLines;

                    markers.push(pointIndex);
                    makeSections();
                    //console.log("Adding plot line : " + plotId);

                    chart.xAxis[0].addPlotLine({
                        value: xValue,
                        width: 2,
                        color: 'red',
                        id: plotId
                    });

                    numberPlotLines += 1;
                    updateSectionEdit();
                }

            }
        },
        name: name,
        type: 'area',
        color: colors[axisIndex],
        fillColor: {
            linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
            },
            stops: [
                [0, fillColors[axisIndex][0]],
                [1, fillColors[axisIndex][1]]
            ]
        },
        yAxis: axisIndex,
        data: filteredSerie
    }, false);

    axisIndex += 1;
    oppositeBool = true;
}

function filtreSerie(dataName) {
    var filteredData = [];
    var max = chart_data["altitude"].length - 1;

    if (!editState) {
        for (var i = 0; i < max; i++) {
            var hiddenPoint = false;

            if (hiddenSections != undefined && hiddenSections.length > 0) {
                for (var j = 0; j < hiddenSections.length; j++) {
                    if (i >= hiddenSections[j][0] && i < hiddenSections[j][1]) {
                        hiddenPoint = true;
                    }
                }
            }
            if (hiddenVisuSections != undefined && hiddenVisuSections.length > 0) {
                for (var l = 0; l < hiddenVisuSections.length; l++) {
                    if (i >= shownSections[hiddenVisuSections[l]][0] && i < shownSections[hiddenVisuSections[l]][1]) {
                        hiddenPoint = true;
                    }
                }
            }

            if (!hiddenPoint) {
                filteredData.push(chart_data[dataName][i]);
            }
        }
        return filteredData;
    }
    else {
        return chart_data[dataName];
    }
}
/*
function inHiddenSectionCheck(index) {
    for (var j = 0; j < hiddenSections.length; j++) {
        if (index >= hiddenSections[j][0] && index <= hiddenSections[j][1]) {
            return true;
        }
    }

    return false;
}

function filtreSerie(dataName) {
    var filteredData = [];
    var max = chart_data["altitude"].length - 1;
    var indexPoint = 0;
    var currentDataIndex = 0;
    var oneTime = false;

    if (!editState && hiddenSections != undefined) {
        while (indexPoint < max) {
            if (inHiddenSectionCheck(indexPoint)) {
                if (!oneTime) {
                    currentDataIndex = indexPoint;
                    oneTime = true;
                    console.log("+ Adding index : " + currentDataIndex);
                }
            }
            else {
                oneTime = false;
                filteredData.push([currentDataIndex, chart_data[dataName][indexPoint][1]]);
                currentDataIndex += 1;
            }

            indexPoint += 1;
        }

    }
    else {
        return chart_data[dataName];
    }

    return filteredData;
}*/

function updateGraph() {
    console.log("- Updating graphe");

    axisIndex = 0;
    oppositeBool = false;

    while (chart.series.length > 0) {
        chart.series[0].remove(false);
    }

    for (var i = 0; i < 2; i++) {
        chart.yAxis[i].update({
            title: {
                text: ''
            }
        });
    }

    if ($.inArray("altitude", optionsArray) != -1) {
        chart.yAxis[axisIndex].update({
            type: 'number',
            title: {
                text: 'Altitude',
                style: {
                    color: colors[axisIndex]
                }
            },
            labels: {
                formatter: function () {
                    return this.value.toString().substring(0, 3) + 'km';
                },
                style: {
                    color: colors[axisIndex]
                }
            },
            opposite: oppositeBool
        });

        addSerie("Altitude", "altitude");
    }
    if ($.inArray("vitesse", optionsArray) != -1) {
        chart.yAxis[axisIndex].update({
            type: 'number',
            title: {
                text: 'Vitesse',
                style: {
                    color: colors[axisIndex]
                }
            },
            labels: {
                formatter: function () {
                    return this.value.toString().substring(0, 3) + 'm/s';
                },
                style: {
                    color: colors[axisIndex]
                }
            },
            opposite: oppositeBool
        });

        addSerie("Vitesse", "vitesse");
    }
    if ($.inArray("freq_cardiaque", optionsArray) != -1) {
        chart.yAxis[axisIndex].update({
            type: 'number',
            title: {
                text: 'Fréquence cardiaque',
                style: {
                    color: colors[axisIndex]
                }
            },
            labels: {
                formatter: function () {
                    return this.value + 'bpm';
                },
                style: {
                    color: colors[axisIndex]
                }
            },
            opposite: oppositeBool
        });

        addSerie("Fréquence cardiaque", "freq_cardiaque");
    }
    if ($.inArray("puissance", optionsArray) != -1) {
        chart.yAxis[axisIndex].update({
            type: 'number',
            title: {
                text: 'Puissance',
                style: {
                    color: colors[axisIndex]
                }
            },
            labels: {
                formatter: function () {
                    return this.value + 'W';
                },
                style: {
                    color: colors[axisIndex]
                }
            },
            opposite: oppositeBool
        });

        addSerie("Puissance", "puissance");
    }
    if ($.inArray("freq_pedalage", optionsArray) != -1) {
        chart.yAxis[axisIndex].update({
            type: 'number',
            title: {
                text: 'Fréquence pédalage',
                style: {
                    color: colors[axisIndex]
                }
            },
            labels: {
                formatter: function () {
                    return this.value + 'tr/min';
                },
                style: {
                    color: colors[axisIndex]
                }
            },
            opposite: oppositeBool
        });

        addSerie("Fréquence pédalage", "freq_pedalage");
    }

    chart.redraw();
}

function initializeSequence() {
    $.ajax({
        type: "POST",
        url: 'PHP/functions.php',
        data: {
            query: "download",
            traceId: currentTraceId
        },
        dataType: 'json',
        success: function (data) {
            // Get graph data
            var altitude = [];
            var vitesse = [];
            var freq_cardiaque = [];
            var puissance = [];
            var freq_pedalage = [];
            var latitude = [];
            var longitude = [];
            var distance;

            for (var i = 0; i < data["altitude"].length; i++) {
                distance = parseFloat(data["distance"][i]);

                altitude.push([distance, parseInt(data["altitude"][i])]);
                vitesse.push([distance, parseInt(data["vitesse"][i])]);
                freq_cardiaque.push([distance, parseInt(data["freq_cardiaque"][i])]);
                puissance.push([distance, parseInt(data["puissance"][i])]);
                freq_pedalage.push([distance, parseInt(data["freq_pedalage"][i])]);
                latitude.push([ parseFloat(data["latitude"][i])]);
                longitude.push([parseFloat(data["longitude"][i])]);
            }

            chart_data = {
                altitude: altitude,
                vitesse: vitesse,
                freq_cardiaque: freq_cardiaque,
                puissance: puissance,
                freq_pedalage: freq_pedalage,
                latitude: latitude,
                longitude: longitude
            };

            //console.log(chart_data);
            initializeGraph();

            // UI elements
            createSectionEdit();
            initMap(chart_data);
        }
    });
}


$(document).ready(function () {
    initializeSequence();
});