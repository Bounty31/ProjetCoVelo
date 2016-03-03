<?php

try {
    $bdd = new PDO('mysql:host=localhost;dbname=veloco;charset=utf8', 'root', '');
} catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}

if (isset($_POST["query"])) {
    if ($_POST["query"] == "download")
        download();
    else if ($_POST["query"] == "upload")
        upload();
    else if ($_POST["query"] == "uploadSections")
        uploadSections();
    else if ($_POST["query"] == "getAllSections")
        getAllSections();
    else if($_POST["query"] == "affichageTrace")
        affichageTrace();
    else
        echo "erreur";
}

// upload file
function upload()
{
    global $bdd;
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
    $nomTablePoints = "trace_" . $lastRow["id"];
    $nomTableSections = "sections_" . $lastRow["id"];

    // Création de la nouvelle table
    $sql = "CREATE TABLE IF NOT EXISTS " . $nomTablePoints . " (
    id_point INT(11) NOT NULL,
    altitude FLOAT NOT NULL,
    distance FLOAT NOT NULL,
    vitesse FLOAT NOT NULL,
    freq_cardiaque FLOAT NOT NULL,
    delta_temps FLOAT NOT NULL,
    puissance FLOAT NOT NULL,
    freq_pedalage FLOAT NOT NULL,
    latitude FLOAT NOT NULL ,
    longitude FLOAT NOT NULL,
    PRIMARY KEY (id_point))";
    $bdd->query($sql);

    // Création de la table contenant les sections
    $sql = "CREATE TABLE IF NOT EXISTS " . $nomTableSections . " (
    debut INT(11) NOT NULL,
    fin INT(11) NOT NULL,
    cacher TINYINT(1) NOT NULL)";
    $bdd->query($sql);


    $absolutePath = realpath(dirname(__FILE__)) . "\\..\\data\\test_data\\" . $fileName;
    $path = str_replace('\\', '/', $absolutePath);

    $sql = "LOAD DATA INFILE '" . $path . "' INTO TABLE " . $nomTablePoints . "
	FIELDS TERMINATED BY ';'
	LINES TERMINATED BY '\\r\\n'
	IGNORE 1 LINES
	(id_point,altitude,@dummy,@dummy,freq_pedalage,@dummy,distance,@dummy,@dummy,@dummy,
		freq_cardiaque,@dummy,@dummy,latitude,longitude,@dummy,puissance,@dummy,@dummy,vitesse,
		@dummy,@dummy,@dummy,@dummy,delta_temps,@dummy,@dummy,@dummy,@dummy,@dummy)";

    $bdd->query($sql);
    echo $sql;
}

// Téléchargement de la trace
function download()
{
    global $bdd;
    // ########### A modifier #############
    $idTrade = $_POST["traceId"];

    $sql = "SELECT * FROM trace_" . $idTrade;
    $result = $bdd->query($sql);
    $data = [];

    $id = [];
    $altitude = [];
    $distance = [];
    $vitesse = [];
    $freq_cardiaque = [];
    $delta_temps = [];
    $puissance = [];
    $freq_pedalage = [];
    $latitude = [];
    $longitude = [];

    while ($row = $result->fetch()) {
        $id[] = $row["id_point"];
        $altitude[] = $row["altitude"];
        $distance[] = $row["distance"];
        $vitesse[] = $row["vitesse"];
        $freq_cardiaque[] = $row["freq_cardiaque"];
        $delta_temps[] = $row["delta_temps"];
        $puissance[] = $row["puissance"];
        $freq_pedalage[] = $row["freq_pedalage"];
        $latitude[] = $row["latitude"];
        $longitude[] = $row["longitude"];
    }

    $data["id_point"] = $id;
    $data["altitude"] = $altitude;
    $data["distance"] = $distance;
    $data["vitesse"] = $vitesse;
    $data["freq_cardiaque"] = $freq_cardiaque;
    $data["delta_temps"] = $delta_temps;
    $data["puissance"] = $puissance;
    $data["freq_pedalage"] = $freq_pedalage;
    $data["latitude"] = $latitude;
    $data["longitude"] = $longitude;

    echo json_encode($data);
}

// Upload des sections
function uploadSections()
{
    global $bdd;
    $id = $_POST["traceId"];

    // Clean sections
    $sql = "TRUNCATE sections_" . $id;
    $bdd->query($sql);

    $verifCacher = false;
    if (isset($_POST["sections"])) {
        $sections = $_POST["sections"];
        if (isset($_POST["hiddenSectionIndexes"])) {
            $hiddenSections = $_POST["hiddenSectionIndexes"];
            $verifCacher = true;
        }

        $compteur = 0;
        $sql = "INSERT INTO sections_" . $id . " (debut, fin, cacher) VALUES ";

        foreach ($sections as $section) {
            $debut = $section[0];
            $fin = $section[1];
            $cacher = 0;

            if ($verifCacher) {
                if (in_array($compteur, $hiddenSections)) {
                    $cacher = 1;
                }
            }

            if ($compteur == 0) {
                $sql .= "('" . $debut . "', '" . $fin . "', '" . $cacher . "')";
            } else {
                $sql .= ", ('" . $debut . "', '" . $fin . "', '" . $cacher . "')";
            }

            $compteur++;
        }

        $bdd->query($sql);
        echo "Done";
    }
}

function getAllSections() {
    global $bdd;
    $id = $_POST["traceId"];
    $sql = "SELECT * FROM sections_" . $id;

    $result = $bdd->query($sql);
    $data = [];

    $debut = [];
    $fin = [];
    $cacher = [];

    while ($row = $result->fetch()) {
        $debut[] = $row["debut"];
        $fin[] = $row["fin"];
        $cacher[] = $row["cacher"];
    }

    $data["debut"] = $debut;
    $data["fin"] = $fin;
    $data["cacher"] = $cacher;

    if (empty($data)) {
        echo json_encode (json_decode ("{}"));
    }
    else {
        echo json_encode($data);
    }
}


function affichageTrace(){
    global $bdd;
    $sql = "SELECT * FROM trace_id";
    $result = $bdd->query($sql);

    $data = [];

    $id = [];
    $nom_parcours = [];
    $date = [];


    while ($row = $result->fetch()) {
        $id[] = $row["id"];
        $nom_parcours[] = $row["nom_parcours"];
        $date[] = $row["date"];
    }

    $data["id"] = $id;
    $data["nom_parcours"] = $nom_parcours;
    $data["date"] = $date;

    echo json_encode($data);
}