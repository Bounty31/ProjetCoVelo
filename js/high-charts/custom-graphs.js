var clickedPlotLimits = [];
var editOption = true;
var clicked = 0;

//ALTITUDE/DISTANCE
function createGraphs(charts_arrays) {
    $(function () {
        Highcharts.setOptions({
            colors: ['#C41232', '#C41232']
        });

        $('#Graph-1').highcharts({
            chart: {
                //zoomType: 'x',
                type: 'spline',
                events: {
                    click: function (evt) {
                        if (editOption) {
                            var xValue = evt.xAxis[0].value;
                            var xAxis = evt.xAxis[0].axis;
                            clicked++;

                            if (clicked == 1) {
                                clickedPlotLimits.push(xValue);
                            }
                            else if (clicked == 2) {
                                if (xValue < clickedPlotLimits[0]) {
                                    clickedPlotLimits.unshift(xValue);
                                }
                                else {
                                    clickedPlotLimits.push(xValue);
                                }
                            }

                            xAxis.addPlotLine({
                                value: xValue,
                                width: 2,
                                color: 'red',
                                id: "plot"
                            });

                            if (clicked == 2) {
                                console.log(clickedPlotLimits);
                                xAxis.addPlotBand({
                                    zIndex: -10,
                                    from: clickedPlotLimits[0],
                                    to: clickedPlotLimits[1],
                                    color: '#FCFFC5',
                                    id: 'plotband'
                                });
                                /* ICI appelé quand plot disparaissent */

                                splitArrayUpdate(charts_arrays["data"], clickedPlotLimits, xAxis);
                                clickedPlotLimits = [];

                                edit = false;
                                clicked = 0;
                            }

                        }
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
            xAxis: {
                type: 'number',
                title: {
                    text: 'Distance en mètres'
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
            },
            yAxis: {
                type: 'number',
                title: {
                    text: 'Altitude en mètres'
                },
                labels: {
                    formatter: function () {
                        return this.value.toString().substring(0, 3) + 'km';
                    }
                }
            },
            legend: {
                enabled: true,
                navigation: {
                    activeColor: '#C41232'
                }
            },

            tooltip: {
                crosshairs: true,
                shared: true
            },

            plotOptions: {
                series: {
                    lineColor: '#C41232'
                },
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, 'rgba(196, 18, 50, 1)'],
                            [1, 'rgba(255, 255, 255, 0)']
                        ]
                    },
                    marker: {
                        radius: 2,
                        enabled: false
                    },
                    lineWidth: 0,
                    states: {
                        hover: {
                            lineWidth: 2
                        }
                    },
                    threshold: null
                }
            },
            series: [
                {
                    type: 'area',
                    name: 'Caché',
                    data: charts_arrays["graph2"],
                    color: '#16a085',
                    tooltip: {
                        pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} m</b><br/>' +
                        '<span style="font-weight: bold; color: {series.color}">Distance parcourue</span>: <b>{point.x:.1f} m</b><br/> '
                    },
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, 'rgba(26, 188, 156,1)'],
                            [1, 'rgba(255, 255, 255, 0)']
                        ]
                    }
                },
                {
                    type: 'area',
                    name: 'Parcour',
                    data: charts_arrays["graph1"]

                }

            ]
        });
    });

// VITESSE/DISTANCE

    $(function () {
        Highcharts.setOptions({
            colors: ['#C41232', '#C41232']
        });

        $('#Graph-2').highcharts({
            chart: {
                zoomType: 'x',
                type: 'spline'
            },
            title: {
                text: 'Vitesse'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Cliquez et laissez enfoncé pour zoomer' : 'Maintenez enfoncé la souris et déplacez là pour zoomer'
            },
            xAxis: {
                type: 'number',
                title: {
                    text: 'Distance en mètres'
                },
                labels: {
                    formatter: function () {
                        return this.value + 'm';
                    }
                }
            },
            yAxis: {
                type: 'number',
                title: {
                    text: 'Vitesse en km/h'
                },
                labels: {
                    formatter: function () {
                        return this.value + 'km/h';
                    }
                }
            },
            legend: {
                enabled: true,
                navigation: {
                    activeColor: '#C41232'
                }
            },

            tooltip: {
                crosshairs: true,
                shared: true
            },

            plotOptions: {

                series: {
                    lineColor: '#C41232'
                },

                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, 'rgba(196, 18, 50, 1)'],
                            [1, 'rgba(255, 255, 255, 0)']
                        ]
                    },
                    marker: {
                        radius: 2,
                        enabled: false
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 2
                        }
                    },
                    threshold: null
                }

            },

            series: [
                {
                    type: 'area',
                    name: 'Vitesse',
                    data: charts_arrays["graph2"],
                    tooltip: {
                        pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} km/h</b><br/>' +
                        '<span style="font-weight: bold; color: {series.color}">Distance parcourue</span>: <b>{point.x:.1f} m</b><br/> '
                    }
                }
            ]
        });
    });


// FREQ CARDIAQUE/DISTANCE

    $(function () {

        Highcharts.setOptions({
            colors: ['#C41232', '#C41232']
        });

        $('#Graph-3').highcharts({
            chart: {
                zoomType: 'x',
                type: 'spline'
            },
            title: {
                text: 'Fréquence cardiaque'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Cliquez et laissez enfoncé pour zoomer' : 'Maintenez enfoncé la souris et déplacez là pour zoomer'
            },
            xAxis: {
                type: 'number',
                title: {
                    text: 'Temps en minutes'
                },
                labels: {
                    formatter: function () {
                        return this.value + 'min';
                    }
                }
            },
            yAxis: {
                type: 'number',
                title: {
                    text: 'Freq cardiaque puls/min'
                },
                labels: {
                    formatter: function () {
                        return this.value + 'puls/min';
                    }
                }
            },
            legend: {
                enabled: true,
                navigation: {
                    activeColor: '#C41232'
                }
            },

            tooltip: {
                crosshairs: true,
                shared: true
            },

            plotOptions: {

                series: {
                    lineColor: '#C41232'
                },

                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, 'rgba(196, 18, 50, 1)'],
                            [1, 'rgba(255, 255, 255, 0)']
                        ]
                    },
                    marker: {
                        radius: 2,
                        enabled: false
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 2
                        }
                    },
                    threshold: null
                }

            },

            series: [
                {
                    type: 'area',
                    name: 'Fréquence cardiaque',
                    data: charts_arrays["graph3"],
                    tooltip: {
                        pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} puls/min</b><br/>' +
                        '<span style="font-weight: bold; color: {series.color}">Instant du parcours</span>: <b>{point.x:.1f} min</b><br/> '
                    }
                }
            ]
        });
    });

// FREQ PEDALAGE/DISTANCE


    $(function () {
        Highcharts.setOptions({
            colors: ['#C41232', '#C41232']
        });

        $('#Graph-4').highcharts({
            chart: {
                zoomType: 'x',
                type: 'spline'
            },
            title: {
                text: 'Fréquence de pédalage'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Cliquez et laissez enfoncé pour zoomer' : 'Maintenez enfoncé la souris et déplacez là pour zoomer'
            },
            xAxis: {
                type: 'number',
                title: {
                    text: 'Temps en minutes'
                },
                labels: {
                    formatter: function () {
                        return this.value + 'min';
                    }
                }
            },
            yAxis: {
                type: 'number',
                title: {
                    text: 'tour/min'
                },
                labels: {
                    formatter: function () {
                        return this.value + 'tour/min';
                    }
                }
            },
            legend: {
                enabled: true,
                navigation: {
                    activeColor: '#C41232'
                }
            },

            tooltip: {
                crosshairs: true,
                shared: true
            },

            plotOptions: {

                series: {
                    lineColor: '#C41232'
                },

                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, 'rgba(196, 18, 50, 1)'],
                            [1, 'rgba(255, 255, 255, 0)']
                        ]
                    },
                    marker: {
                        radius: 2,
                        enabled: false
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 2
                        }
                    },
                    threshold: null
                }

            },

            series: [
                {
                    type: 'area',
                    name: 'Fréquence de pédalage',
                    data: charts_arrays["graph4"],
                    tooltip: {
                        pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} tour/min</b><br/>' +
                        '<span style="font-weight: bold; color: {series.color}">Instant du parcours</span>: <b>{point.x:.1f} min</b><br/> '
                    }
                }
            ]
        });
    });

// FREQ PUISSANCE INSTANTANNEE

    $(function () {
        Highcharts.setOptions({
            colors: ['#C41232', '#C41232']
        });

        $('#Graph-5').highcharts({


            chart: {
                zoomType: 'xy'
            },
            title: {
                text: 'Puissance instantanée vs Distance vs Vitesse'
            },

            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Cliquez et laissez enfoncé pour zoomer' : 'Maintenez enfoncé la souris et déplacez là pour zoomer'
            },

            xAxis: [{
                categories: ['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1', '1.1', '1.2'],
                title: {
                    text: 'Distance en km'
                },
                labels: {
                    formatter: function () {
                        return this.value + 'km';
                    }
                }
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value} W'
                },
                title: {
                    text: 'Puissance instantanée en W'
                }
            }, { // Secondary yAxis
                title: {
                    text: 'Vitesse km/h'
                },
                labels: {
                    format: '{value} km/h'
                },
                opposite: true
            }],

            tooltip: {
                shared: true
            },

            series: [{
                name: 'Vitesse',
                type: 'column',
                yAxis: 1,
                data: [26, 19, 17, 18, 18, 16, 32, 28, 28, 27, 27, 26, 27, 27],
                tooltip: {
                    pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} km/h</b><br/> '
                }
            }, {
                name: 'Puissance instantanée',
                type: 'spline',
                data: [421, 533, 612, 754, 896, 1023, 952, 852, 741, 702, 607, 577, 536, 499],
                tooltip: {
                    pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} W</b> '
                }
            }]
        });
    });

// PENTE EN %

// VITESSE/DISTANCE

    $(function () {
        Highcharts.setOptions({
            colors: ['#C41232', '#C41232']
        });

        $('#Graph-6').highcharts({
            chart: {
                zoomType: 'x',
                type: 'spline'
            },
            title: {
                text: 'Pente'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Cliquez et laissez enfoncé pour zoomer' : 'Maintenez enfoncé la souris et déplacez là pour zoomer'
            },
            xAxis: {
                type: 'number',
                title: {
                    text: 'Distance en mètres'
                },
                labels: {
                    formatter: function () {
                        return this.value + 'm';
                    }
                }
            },
            yAxis: {
                type: 'number',
                title: {
                    text: 'Pente en %'
                },
                labels: {
                    formatter: function () {
                        return this.value + '%';
                    }
                }
            },
            legend: {
                enabled: true,
                navigation: {
                    activeColor: '#C41232'
                }
            },

            tooltip: {
                crosshairs: true,
                shared: true
            },

            plotOptions: {

                series: {
                    lineColor: '#C41232'
                },

                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, 'rgba(196, 18, 50, 1)'],
                            [1, 'rgba(255, 255, 255, 0)']
                        ]
                    },
                    marker: {
                        radius: 2,
                        enabled: false
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 2
                        }
                    },
                    threshold: null
                }

            },

            series: [
                {
                    type: 'area',
                    name: 'Pente',
                    data: charts_arrays["graph5"],
                    tooltip: {
                        pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} %</b><br/>' +
                        '<span style="font-weight: bold; color: {series.color}">Distance</span>: <b>{point.x:.1f} m</b><br/> '
                    }
                }
            ]
        });
    });

}
function grapheUpdateCallback(xAxis) {
    $.each(xAxis.plotLinesAndBands, function () {
        xAxis.removePlotLine(this.id);
    });
}
displayGraphs();