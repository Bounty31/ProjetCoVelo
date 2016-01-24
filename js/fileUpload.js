/*
*
*
*Fichier se chargeant de faire l'import du fichier dans la bdd
*
*/

var file;
document.getElementById('chooseFile').onchange = function(){
  //prend le fichier uploadé
  file = this.files[0];
};

function validateFile(){

 //Affichage du loader
 var loader = document.getElementById("loader");
 loader.classList.remove("hidden");

 // file = document.getElementById('chooseFile').files[0];
  var reader = new FileReader();
  reader.onload = function(progressEvent){

    //decoupage du fichier
    var lines = this.result.split('\n');
    var champs = lines[0].split(";");
    var divCsv = document.getElementById("displaycsv");
    var donnees = {};

    //créé une clef et un array associé pour chaque champs
    for (var i = champs.length - 1; i >= 0; i--) {
      donnees[champs[i]] = new Array();
    };

    //remplissage des champs
    for(var line = 1; line < lines.length-1; line++){ 

      var detailChamps = lines[line].split(";");
      //commence à iterer seulement à la deuxieme ligne, car csv contient en premiere ligne les noms des  champs
      for (var i = detailChamps.length - 1; i >= 0; i--) {
       donnees[champs[i]].push(detailChamps[i]);
     };


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
console.log(tracedata);
  //envoie du tableau à la page php pour insertion bdd
   $.ajax({
     type: "POST",
     url: "js/traceFile_to_db.php",
     data: {trace : tracedata},
     success: function() {
      //action quand tout est chargé
          alert("finish");
         loader.classList.add("hidden");
        }
      });
 };

 reader.readAsText(file);
}