<?php
try
{
	$bdd = new PDO('mysql:host=localhost;dbname=veloco;charset=utf8', 'root', '');
}
catch (Exception $e)
{
	die('Erreur : ' . $e->getMessage());
}

if(isset($_POST["query"])){
	if($_POST["query"] == "download")
		download($bdd);
	else if($_POST["query"] == "upload")
		upload($bdd);
	else
		echo "erreur";
}

// upload file
function upload($bdd){
	$fileName = $_POST["fileName"];
	$traceName = $_POST["traceName"];

	$absolutePath = realpath(dirname(__FILE__)) . "\\..\\data\\test_data\\" . $fileName;
	$path = str_replace('\\', '/', $absolutePath);

	$sql = "LOAD DATA INFILE '" . $path . "' INTO TABLE trace
	FIELDS TERMINATED BY ';'
	LINES TERMINATED BY '\\r\\n'
	IGNORE 1 LINES
	(id_trace,altitude,@dummy,@dummy,freq_pedalage,@dummy,@dummy,distance,@dummy,@dummy,
		freq_cardiaque,@dummy,@dummy,@dummy,@dummy,@dummy,puissance,@dummy,@dummy,vitesse,
		@dummy,@dummy,@dummy,@dummy,delta_temps,@dummy,@dummy,@dummy,@dummy,@dummy)";

$bdd->query($sql);
}

// download trace
function download($bdd){

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
}
?>