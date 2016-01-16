//ALTITUDE/DISTANCE

$(function () {
    //Si on veut utiliser un JSON, utiliser la ligne juste ci-dessous
    $.getJSON('data/data-test1.JSON', function (data) {

        Highcharts.setOptions({
            colors: ['#C41232', '#C41232']
        });

        $('#Graph-1').highcharts({
            chart: {
                zoomType: 'x',
                type: 'spline'
            },
            title: {
                text: 'Altitude'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Cliquez et laissez enfoncé pour zoomer' : 'Maintenez enfoncé la souris et déplacez là pour zoomer'
            },
            xAxis: {
                type: 'number',
                title : {
                    text : 'Distance en mètres'
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
                    text: 'Altitude en mètres'
                },
                labels: {
                    formatter: function () {
                        return this.value + 'm';
                    }
                }
            },
            legend: {
                enabled: true,
                navigation:{
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
                    name: 'Dénivelé',
                    data:  [[0, 210],[100, 230],[200, 263],[300, 277],[400,299],[400,298],[500,323],[600,322],[700,311],[800,299],[900,277],[1000,263],[1100,252],[1200,243],[1300,230]],
                    tooltip: {
                        pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} m</b><br/>' +
                                     '<span style="font-weight: bold; color: {series.color}">Distance parcourue</span>: <b>{point.x:.1f} m</b><br/> '
                    }
                }
                //Permet l'affichage d'une deuxième courbe avec le JSON
                ,
                {
                    type: 'area',
                    name: 'Dénivelé parcours 2',
                    data:  data
                }
            ]
        });
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
            title : {
                text : 'Distance en mètres'
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
            navigation:{
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
                data:  [[0, 26],[100, 19],[200, 17],[300, 18],[400,18],[500,16],[600,32],[700, 28],[800,28],[900,27],[1000,27],[1100,26],[1200,27],[1300,27]],
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
            title : {
                text : 'Temps en minutes'
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
            navigation:{
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
                data:  [[1, 85],[2, 93],[3, 122],[4, 155],[5,185],[6,175],[7,163],[8, 142],[9,131],[10,119],[11,113],[12,105],[13,100],[14,95]],
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
            title : {
                text : 'Temps en minutes'
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
            navigation:{
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
                data:  [[1, 65],[2, 72],[3, 80],[4, 82],[5,79],[6,50],[7,37],[8, 38],[9,39],[10,43],[11,44],[12,60],[13,64],[14,65]],
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
            title : {
                text : 'Distance en km'
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
            title : {
                text : 'Distance en mètres'
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
            navigation:{
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
                data:  [[0, 3],[100, 4],[200, 6],[300, 9],[400,11],[500,16],[600,15],[700, 13],[800,12],[900,10],[1000,9],[1100,7],[1200,6],[1300,5]],
                tooltip: {
                    pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} %</b><br/>' +
                                 '<span style="font-weight: bold; color: {series.color}">Distance</span>: <b>{point.x:.1f} m</b><br/> '
                }
            }
        ]
    });
});