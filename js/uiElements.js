function sortArrayAscendant(array) {
    array.sort(function(a, b){return a-b});
    return array;
}

function removeArrayDuplicates(array) {
    return array.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
}

function makeSections() {
    var min = 0;
    var max = chart_data["altitude"].length - 1;
    markers = sortArrayAscendant(markers);
    sections = [];

    for (var i = 0; i < markers.length + 1; i++) {
        if (i == 0) {
            sections.push([min, markers[i]]);
        }
        else if (i == markers.length) {
            sections.push([markers[i-1], max]);
        }
        else {
            sections.push([markers[i-1], markers[i]]);
        }
    }

    console.log(sections);
}

function createSectionEdit() {
    $.ajax({
        type: "POST",
        url: 'PHP/functions.php',
        data: {
            query: "getAllSections",
            traceId: currentTraceId
        },
        dataType: 'json',
        success: function (data) {
            for (var i = 0; i < data["debut"].length; i++) {
                sections.push([data["debut"][i], data["fin"][i]]);
                markers.push(data["debut"][i]);
            }

            if (sections.length > 0) {
                markers.splice( $.inArray("0", markers), 1);
                console.log(markers);

                for (var i = 0; i < markers.length; i++) {
                    var plotId = "plotline-" + numberPlotLines;
                    console.log(chart_data["altitude"][markers[i]][0]);
                    chart.xAxis[0].addPlotLine({
                        value: chart_data["altitude"][markers[i]][0],
                        width: 2,
                        color: 'red',
                        id: plotId
                    });

                    numberPlotLines += 1;
                }

                // Creating the edit sections select
                var option, tempIndex;

                for (var i = 1; i < sections.length + 1; i++) {
                    tempIndex = i - 1;
                    option = $("<option/>", {
                        text: "Section " + i,
                        value: tempIndex,
                        selected: !!parseInt(data["cacher"][tempIndex])
                    });
                    option.appendTo("#selectSectionsEdit");
                }

                $("#selectSectionsEdit").multiselect('refresh');
            }
        }
    });
}

function updateSectionEdit() {
    // Clearing options from select
    $("#selectSectionsEdit").empty();
    var option, tempIndex;

    for (var i = 1; i < sections.length + 1; i++) {
        tempIndex = i - 1;
        option = $("<option/>", {
            text: "Section " + i,
            value: tempIndex
        });
        option.appendTo("#selectSectionsEdit");
    }

    $("#selectSectionsEdit").multiselect('refresh');
}