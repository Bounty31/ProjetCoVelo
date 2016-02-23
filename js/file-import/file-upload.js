/*
 *Fichier se chargeant de faire l'import du fichier dans la BDD
 */

function validateFile() {
    var loader = document.getElementById("loader");
    loader.classList.remove("hidden");

    var fileName = $("#noFile").text();
    var traceName = $("#traceName").val();
    var date = "2016-02-18";

    console.log({fileName: fileName, traceName: traceName});

    $.ajax({
        type: "POST",
        url: "PHP/functions.php",
        data: {
            query: "upload",
            fileName: fileName,
            traceName: traceName,
            date: date
        },
        success: function () {
            loader.classList.add("hidden");
            //location.reload();
        }
    });
}