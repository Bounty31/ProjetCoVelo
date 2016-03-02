$(document).ready(function () {
    // Default visu mode
    $(".editionSections").hide();

    var selectDonnees = $("#selectTypeDonnee").multiselect({
        header: false,
        selectedList: 2,
        click: function(event, ui){
            var nbrSelected = $(this).multiselect("widget").find("input:checked").length;

            if (nbrSelected > 2 || nbrSelected < 1){
                return false;
            }
            else {
                if (ui.checked) {
                    optionsArray.push(ui.value);
                    optionsArray = $.unique(optionsArray);
                }
                else {
                    optionsArray.splice( $.inArray(ui.value, optionsArray) ,1 );
                }

                updateGraph();
            }
        }
    });

    var selectSections = $("#selectSections").multiselect({
        header: "Cocher les sections à cacher",
        click: function(event, ui){
            var array_of_checked_values = $("#selectSections").multiselect("getChecked").map(function(){
                return this.value;
            }).get();

            hiddenVisuSections = array_of_checked_values;
            updateGraph();
        }
    });

    var selectSectionsEdit = $("#selectSectionsEdit").multiselect({
        header: "Cocher les sections à supprimer"
    });

    $("#editionMode").click(function() {
        editState = !editState;
        selectDonnees.multiselect(editState ? 'disable' : 'enable');
        selectSections.multiselect(editState ? 'disable' : 'enable');

        if ($("#editionMode").is(":checked")) {
            console.log("Mode d'édition");

            updateGraph();
            $(".editionSections").show();

            chart.zoom();
            chart.pointer.zoomX = false;
        }
        else {
            console.log("Mode de visualisation");

            updateGraph();
            $(".editionSections").hide();
            chart.pointer.zoomX = true;
        }
    });

    $("#deleteMarkers").click(function() {
        // Deleting markers
        var plotLineId;

        for (var i = 0; i < numberPlotLines; i++) {
            plotLineId = "plotline-" + i;
            chart.xAxis[0].removePlotLine(plotLineId);
        }

        numberPlotLines = 0;
        markers = [];
        sections = [];
        updateSectionEdit();
    });

    $("#saveMarkers").click(function() {
        // Saving markers
        var array_of_checked_values = $("#selectSectionsEdit").multiselect("getChecked").map(function(){
            return this.value;
        }).get();

        $.ajax({
            type: "POST",
            url: 'PHP/functions.php',
            data: {
                query: "uploadSections",
                sections: sections,
                hiddenSectionIndexes: array_of_checked_values,
                traceId: currentTraceId
            },
            success: function () {
                console.log("Saved sections to db");
                sections = [];
                markers = [];
                hiddenSections = [];
                shownSections = [];
                hiddenVisuSections = [];

                $("#selectSectionsEdit").empty();
                createSectionEdit();
            }
        });
    });

});
