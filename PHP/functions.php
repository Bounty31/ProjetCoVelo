<?php
try {
	$bdd = new PDO('mysql:host=localhost;dbname=veloco;charset=utf8', 'root', '');
}
catch (Exception $e) {
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
    $date = $_POST["date"];

    // Insertion dans trace_id
    $sql = "INSERT INTO trace_id (id, nom_parcours, date) VALUES (NULL, '" . $traceName . "', '" . $date . "')";
    $bdd->query($sql);

    // Récupération de la dernière table
    $sql = "SELECT * FROM trace_id ORDER BY id DESC LIMIT 1";
    $resultat = $bdd->query($sql);
    $lastRow = $resultat->fetch();
    $nomTable = "trace_" . $lastRow["id"];

    // Création de la nouvelle table
    $sql = "CREATE TABLE IF NOT EXISTS " . $nomTable . " (
    id_point int(11) NOT NULL,
    altitude float NOT NULL,
    distance float NOT NULL,
    vitesse float NOT NULL,
    freq_cardiaque float NOT NULL,
    delta_temps float NOT NULL,
    puissance float NOT NULL,
    freq_pedalage float NOT NULL,
    latitude float NOT NULL ,
    longitude float NOT NULL,
    PRIMARY KEY (id_point))";
    $bdd->query($sql);


	$absolutePath = realpath(dirname(__FILE__)) . "\\..\\data\\test_data\\" . $fileName;
	$path = str_replace('\\', '/', $absolutePath);

	$sql = "LOAD DATA INFILE '" . $path . "' INTO TABLE " . $nomTable . "
	FIELDS TERMINATED BY ';'
	LINES TERMINATED BY '\\r\\n'
	IGNORE 1 LINES
	(id_point,altitude,@dummy,@dummy,freq_pedalage,@dummy,@dummy,distance,@dummy,@dummy,
		freq_cardiaque,@dummy,@dummy,latitude,longitude,@dummy,puissance,@dummy,@dummy,vitesse,
		@dummy,@dummy,@dummy,@dummy,delta_temps,@dummy,@dummy,@dummy,@dummy,@dummy)";

    $bdd->query($sql);
    echo $sql;
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