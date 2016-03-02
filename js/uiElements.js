function sortArrayAscendant(array) {
    array.sort(function(a, b){return a-b});
    return array;
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
}

function updateSectionVisu() {
    // Clearing options from select
    $("#selectSections").empty();
    var option, tempIndex;


    if (shownSections != undefined) {
        for (var i = 1; i < shownSections.length + 1; i++) {
            tempIndex = i - 1;
            option = $("<option/>", {
                text: "Section " + i,
                value: tempIndex
            });
            option.appendTo("#selectSections");
        }

        $("#selectSections").multiselect('refresh');
    }
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
                hiddenSections = [];
                shownSections = [];
                hiddenVisuSections = [];

                for (var i = 0; i < markers.length; i++) {
                    var plotId = "plotline-" + numberPlotLines;
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
                    if (!!parseInt(data["cacher"][tempIndex])) {
                        hiddenSections.push(sections[tempIndex]);
                    }
                    else {
                        shownSections.push(sections[tempIndex]);
                    }
                }

                $("#selectSectionsEdit").multiselect('refresh');
            }
            updateGraph();
            updateSectionVisu();
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