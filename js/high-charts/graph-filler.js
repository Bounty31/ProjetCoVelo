var chart;
var chartOptions;
var chart_data;
var axisIndex = 0;
var oppositeBool = false;

// Colors for both series
var colors = ["#C41232", "#0E79DC"];
var fillColors = {
    0 : ["rgba(196, 18, 50, 1)", "rgba(196, 18, 50, 0.2)"],
    1 : ["rgba(14, 121, 220, 1)", "rgba(14, 121, 220, 0.2)"]
};

// Options : altitude, vitesse, freq_cardiaque, puissance, freq_pedalage
// Default chart options
var optionsArray = ["altitude", "vitesse"];

function initGraphe() {
    console.log("Initializing chart");

    chartOptions = {
        chart: {
            zoomType: 'x',
            renderTo: 'Graph-1',
            type: 'spline',
            events: {
                click: function (evt) {
                    /*if (editOption) {
                     var xValue = evt.xAxis[0].value;
                     var xAxis = evt.xAxis[0].axis;*/
                }
            }
        },
        title: {
            text: 'Altitude'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                'Cliquez et laissez enfoncé pour zoomer' : 'Maintenez enfoncé la souris et déplacez la pour zoomer'
        },
        yAxis: [{},{}],
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
    chart.addSeries({
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
            ]},
        yAxis: axisIndex,
        data: chart_data[dataName]
    }, false);

    axisIndex += 1;
    oppositeBool = true;
}

function updateGraphe() {
    console.log("Updating graphe");

    axisIndex = 0;
    oppositeBool = false;

    while( chart.series.length > 0 ) {
        chart.series[0].remove( false );
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

function getGrapheData() {
    $.ajax({
        type: "POST",
        url: 'PHP/functions.php',
        data: {query: "download"},
        dataType: 'json',
        success: function (data) {
            var altitude = [];
            var vitesse = [];
            var freq_cardiaque = [];
            var puissance = [];
            var freq_pedalage = [];
            var distance = 0;

            for (var i = 0; i < data["altitude"].length; i++) {
                distance += parseFloat(data["distance"][i]);

                altitude.push([distance, parseInt(data["altitude"][i])]);
                vitesse.push([distance, parseInt(data["vitesse"][i])]);
                freq_cardiaque.push([distance, parseInt(data["freq_cardiaque"][i])]);
                puissance.push([distance, parseInt(data["puissance"][i])]);
                freq_pedalage.push([distance, parseInt(data["freq_pedalage"][i])]);
            }

            chart_data = {
                altitude : altitude,
                vitesse : vitesse,
                freq_cardiaque : freq_cardiaque,
                puissance : puissance,
                freq_pedalage : freq_pedalage
            }

            //console.log(chart_data);
            initGraphe();
            updateGraphe()
        }
    });
}

$(document).ready(function () {
    getGrapheData();
});