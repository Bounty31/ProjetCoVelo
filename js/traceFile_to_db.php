<!-- PHP permettant d'inserer la trace via requete ajax à l'acceptation d'un fichier -->

<?php
try {
    $bdd = new PDO('mysql:host=localhost;dbname=veloco;charset=utf8', 'root', '');
} catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}

/*var_dump($_POST['trace']);*/
//creation d'un id de trace
$bdd->query("INSERT INTO trace_id VALUES (NULL)");

$lastID = $bdd->lastInsertId();

//get id de la trace courante
//get la taille de la trace
$tailleTrace = sizeof($_POST['trace']['altitude']);

//iteration sur le POST id trace à changer
for ($i = 0; $i < $tailleTrace; $i++) {
    //insertion
    $bdd->query("INSERT INTO trace VALUES (" . $lastID . ", " . $_POST['trace']['altitude'][$i] . ", " . $_POST['trace']['distance'][$i] . "," . $_POST['trace']['vitesse'][$i] . "," . $_POST['trace']['freq_cardiaque'][$i] . "," . $_POST['trace']['delta_temps'][$i] . "," . $_POST['trace']['puissance'][$i] . "," . $_POST['trace']['freq_pedalage'][$i] . ",0);");
}
var_dump($_POST["hide"]);
?>