$(document).ready(function () {

    $.ajax({
        type: "POST",
        url: 'PHP/functions.php',
        data: {
            query: "affichageTrace"
        },
        dataType: 'json',
        success: function (data) {

            $("#parcours_infos").empty();
            var nom, date,buttonDelete, h;
            console.log(data);
            for (var i = 0; i < data["id"].length + 1; i++) {

                h = $("<h4/>", {
                    id: data["id"][i],
                    class : "choix_trace"
                });
                h.appendTo("#parcours_infos");

                nom = $("<a/>", {
                    text: data["nom_parcours"][i]
                });
                nom.appendTo("#" + data["id"][i]);

                date = $("<span/>", {
                    text: data["date"][i],
                    class :"badge pull-right"

                });

                date.appendTo("#" + data["id"][i]);

                //buttonDelete = $("<button/>", {
                //    id: data["id"],
                //    class :"btn btn-danger btn-xs"
                //});
                //
                //buttonDelete.appendTo("#parcours_infos");

            }
            $(choix_trace).onclick = function(){

            };
        }

    });
    //<!--<button class="btn btn-danger btn-xs" id="<?php $row["id_trace"]; ?>" onclick="delete_trace(id);"><span class="glyphicon glyphicon-trash"></span></button>-->
});

