<?php 
try
{
	$bdd = new PDO('mysql:host=localhost;dbname=veloco;charset=utf8', 'root', '');
}
catch (Exception $e)
{
	die('Erreur : ' . $e->getMessage());
}

/*var_dump($_POST['trace']);*/
//creation d'un id de trace
$result = $bdd->query("SELECT * FROM trace");
$data = [];

$id = [];
$altitude = [];
$distance = [];
$vitesse = [];
$freq_cardiaque = [];
$delta_temps = [];
$puissance = [];
$freq_pedalage = [];
$cacher = [];

while($row = $result->fetch()) {
	$id[] = $row["id_trace"];
	$altitude[] = $row["altitude"];
	$distance[] = $row["distance"];
	$vitesse[] = $row["vitesse"];
	$freq_cardiaque[] = $row["freq_cardiaque"];
	$delta_temps[] = $row["delta_temps"];
	$puissance[] = $row["puissance"];
	$freq_pedalage[] = $row["freq_pedalage"];
	$cacher[] = $row["cacher"];

}

$data["id"] = $id;
$data["altitude"] = $altitude;
$data["distance"] = $distance;
$data["vitesse"] = $vitesse;
$data["freq_cardiaque"] = $freq_cardiaque;
$data["delta_temps"] = $delta_temps;
$data["puissance"] = $puissance;
$data["freq_pedalage"] = $freq_pedalage;
$data["cacher"] = $cacher;

echo json_encode($data);
?>