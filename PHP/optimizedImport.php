<?php

$mysqli  =  new mysqli('localhost','root','','veloco');
/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

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

//Try to execute query (not stmt) and catch mysqli error from engine and php error
if (!($stmt = $mysqli->query($sql))) {
    echo "\nQuery execute failed: ERRNO: (" . $mysqli->errno . ") " . $mysqli->error;
};
