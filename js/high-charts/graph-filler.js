var chart;
var chartOptions;
var chart_data;

// Options : altitude, vitesse, freq_cardiaque, puissance, freq_pedalage
// Default chart options
var optionsArray = ["altitude"];

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
        yAxis: [{ // Primary yAxis
            labels: {
                style: {
                    color: '#c41232'
                }
            },
            title: {
                style: {
                    color: '#c41232'
                }
            }
        }, { // Secondary yAxis
            title: {
                style: {
                    color: '#0E79E0'
                }
            },
            labels: {
                style: {
                    color: '#0E79E0'
                }
            },
            opposite: true
        }],
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

function updateGraphe() {
    // Distance sur l'axe x
    chart.xAxis[0].update({
        type: 'number',
        title: {
            text: 'Distance en kilomètres'
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

    if ($.inArray("altitude", optionsArray) != -1) {
        chart.yAxis[0].update({
            type: 'number',
            title: {
                text: 'Altitude'
            },
            labels: {
                formatter: function () {
                    return this.value.toString().substring(0, 3) + 'km';
                }
            }
        });
        chart.yAxis[1].update({
            type: 'number',
            title: {
                text: 'Vitesse'
            },
            labels: {
                formatter: function () {
                    return this.value.toString().substring(0, 3) + 'm/s';
                }
            }
        });

        chart.addSeries({
            name: "Altitude",
            type: 'area',
            yAxis: 0,
            data: chart_data["altitude"]
        }, false);

        chart.addSeries({
            name: "Vitesse",
            type: 'area',
            yAxis: 1,
            data: chart_data["vitesse"]
        }, false);


        chart.redraw();
    }
    else if ($.inArray("vitesse", options) != -1) {

    }
    else if ($.inArray("freq_cardiaque", options) != -1) {

    }
    else if ($.inArray("puissance", options) != -1) {

    }
    else if ($.inArray("freq_pedalage", options) != -1) {

    }
}

$(document).ready(function () {
    getGrapheData();
});