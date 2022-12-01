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
	$recherche=trim($data['recherche']);
    if ($recherche=="") {
        $sql="SELECT `discussion`.idDiscussion as idDiscussion, `titre`, `dateCréation`, discussion.username, 
					(SELECT COUNT(*) FROM discussion 
					JOIN message ON message.idDiscussion=discussion.idDiscussion) as messages FROM `discussion` 
				ORDER BY dateCréation DESC limit 10 offset ".strval(($data['page']-1)*10);
        $result = sgbd_execute_requete($sql);

        $jsonData = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($jsonData);

        exit();
    } else {
    	$sql="SELECT `discussion`.idDiscussion as idDiscussion, `titre`, `dateCréation`, discussion.username, COUNT(idMessage) FROM `discussion` 
		LEFT JOIN message ON message.idDiscussion=discussion.idDiscussion 
		LEFT JOIN discussion_possede_categorie on discussion_possede_categorie.idDiscussion=discussion.idDiscussion 
		LEFT JOIN categorie on categorie.idCategorie=discussion_possede_categorie.idCategorie 
		WHERE titre LIKE '%?%' OR nom LIKE '%?%' ORDER BY dateCréation DESC limit 10 offset ".strval(($data['page']-1)*10);
		$result = sgbd_execute_prepared_requete($sql, [$recherche,$recherche]); //sgbd_execute_prepared_requete($reqToPrepare, $param);

		$jsonData = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($jsonData);
    };

}

?>
