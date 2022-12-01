<?php
// Envoi JSON : 
include "bdd_connection.php";

session_start();
$data = json_decode($_POST["json"], true);

// ------------------------------------------ Check Session ------------------------------------------
// Envoi JSON : {action:SESSION}
if ($data['action']=="SESSION" ) {

	// Il n'y a pas de session ou pas de session d'un Admin
	if (!isset($_SESSION['username'])) {
		$jsonError = ["response" => 1];

		echo json_encode($jsonError);

		exit();
	} else {
		$jsonError = ["response" => 0];
		echo json_encode($jsonError);

		exit();
	}
}

// ------------------------------------------ Renvoi Data Discussion ------------------------------------------
// Envoi JSON : {action:DISCUSSION, recherche:"Truc", page:int()} -> 
if ($data['action']=="DISCUSSION" ) {
    // Pas de recherche
    if (trim($data['recherche'])=="") {
        $sql="SELECT `idDiscussion`, `titre`, `dateCréation` FROM `discussion` 
                ORDER BY dateCréation DESC limit 10 offset ".strval(($data['page']-1)*10);
        $result = sgbd_execute_requete($sql);

        $jsonData = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($jsonData);

        exit();
    }

}

?>