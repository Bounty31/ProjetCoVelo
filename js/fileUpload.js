/*
 *
 *
 *Fichier se chargeant de faire l'import du fichier dans la bdd
 *
 */
var file;
document.getElementById('chooseFile').onchange = function () {
    //prend le fichier uploadé
    file = this.files[0];
};

function validateFile() {

    //Affichage du loader
    var loader = document.getElementById("loader");
    loader.classList.remove("hidden");

    // file = document.getElementById('chooseFile').files[0];
    var reader = new FileReader();
    reader.onload = function (progressEvent) {

        //decoupage du fichier
        var lines = this.result.split('\n');
        var champs = lines[0].split(";");
        var donnees = {};


        //créé une clef et un array associé pour chaque champs
        for (var i = champs.length - 1; i >= 0; i--) {
            donnees[champs[i]] = new Array();
        }
        ;

        //remplissage des champs
        for (var line = 1; line < lines.length - 1; line++) {

            var detailChamps = lines[line].split(";");
            //commence à iterer seulement à la deuxieme ligne, car csv contient en premiere ligne les noms des  champs
            for (var i = detailChamps.length - 1; i >= 0; i--) {
                donnees[champs[i]].push(detailChamps[i]);
            }
            ;


        }

        //debug
        //console.log(donnees);

        //creation du tableau à envoyer
        var tracedata = {};
        tracedata["altitude"] = donnees["Altitude [m]"];
        tracedata["distance"] = donnees["Distance [m]"];
        tracedata["vitesse"] = donnees["Speed [m/s]"];
        tracedata["freq_cardiaque"] = donnees["Heartrate [bpm]"];
        tracedata["delta_temps"] = donnees["TrainingTime [s]"];
        tracedata["puissance"] = donnees["Power [Watt]"];
        tracedata["freq_pedalage"] = donnees["Cadence [rpm]"];
        //On decoupe le tableau en sous tableaux de 400 lignes
        splitArray(tracedata);
        //envoie du tableau à la page php pour insertion bdd

    };

    reader.readAsText(file);
}

function splitArray(array) {
    arrayRes = {};
    var sizeOfQuery = 35;
    reste = array['altitude'].length % sizeOfQuery;
    lenght = array['altitude'].length - reste;
    nbtour = lenght / sizeOfQuery;
    for (var i = 0; i < nbtour; i++) {
        var index = 0;
        arrayRes = {};
        arrayRes["altitude"] = Array();
        arrayRes["distance"] = Array();
        arrayRes["vitesse"] = Array();
        arrayRes["freq_cardiaque"] = Array();
        arrayRes["delta_temps"] = Array();
        arrayRes["puissance"] = Array();
        arrayRes["freq_pedalage"] = Array();

        for (var j = 0; j < sizeOfQuery; j++) {
            index = i * sizeOfQuery + j;
            arrayRes["altitude"].push(array["altitude"][index]);
            arrayRes["distance"].push(array["distance"][index]);
            arrayRes["vitesse"].push(array["vitesse"][index]);
            arrayRes["freq_cardiaque"].push(array["freq_cardiaque"][index]);
            arrayRes["delta_temps"].push(array["delta_temps"][index]);
            arrayRes["puissance"].push(array["puissance"][index]);
            arrayRes["freq_pedalage"].push(array["freq_pedalage"][index]);
        }
        ;
        $.ajax({
            type: "POST",
            url: "js/traceFile_to_db.php",
            data: {trace: arrayRes},
            success: function () {
                console.log("serie finie");
            }
        });
    }
    ;

    arrayRes = {};
    arrayRes["altitude"] = Array();
    arrayRes["distance"] = Array();
    arrayRes["vitesse"] = Array();
    arrayRes["freq_cardiaque"] = Array();
    arrayRes["delta_temps"] = Array();
    arrayRes["puissance"] = Array();
    arrayRes["freq_pedalage"] = Array();
    for (var j = 0; j < reste; j++) {
        index = nbtour * sizeOfQuery + j;
        arrayRes["altitude"].push(array["altitude"][index]);
        arrayRes["distance"].push(array["distance"][index]);
        arrayRes["vitesse"].push(array["vitesse"][index]);
        arrayRes["freq_cardiaque"].push(array["freq_cardiaque"][index]);
        arrayRes["delta_temps"].push(array["delta_temps"][index]);
        arrayRes["puissance"].push(array["puissance"][index]);
        arrayRes["freq_pedalage"].push(array["freq_pedalage"][index]);
    }
    ;
    $.ajax({
        type: "POST",
        url: "js/traceFile_to_db.php",
        data: {trace: arrayRes},
        success: function () {
            //action quand tout est chargé
            location.reload();
            loader.classList.add("hidden");
        }
    });
}