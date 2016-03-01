/*
 *Fichier se chargeant de faire l'import du fichier dans la BDD
 */

function validateFile() {
    var loader = document.getElementById("loader");
    loader.classList.remove("hidden");

    var fileName = $("#noFile").text();
    var traceName = $("#traceName").val();
    var date = $("#traceDate").val();

    console.log({fileName: fileName, traceName: traceName, traceDate: date});

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
            location.reload();
        }
    });
}