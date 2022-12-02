<?php
include "bdd_connection.php";

session_start();
$data = json_decode($_POST["json"], true);

// ------------------------------------------ Renvoi Data Discussion ------------------------------------------
// Envoi JSON : {action:DISCUSSION, recherche:"Truc", page:int()} ->
if ($data['action']=="DISCUSSION" ) {
    // Pas de recherche
	$recherche=trim($data['recherche']);
    if ($recherche=="") {
        $sql="SELECT `discussion`.idDiscussion as idDiscussion, `titre`, `dateCréation`, discussion.username, 
					(SELECT COUNT(*) FROM discussion 
					JOIN message ON message.idDiscussion=discussion.idDiscussion) as messages FROM `discussion` 
				ORDER BY dateDernierMessage DESC limit 10 offset ".strval(($data['page']-1)*10);
        $result = sgbd_execute_requete($sql);
        $jsonData = $result->fetch_all(MYSQLI_ASSOC);

		$sql="SELECT COUNT(*) as nbDiscussion FROM `discussion`";
		$result = sgbd_execute_requete($sql);
		$jsonNbDis = $result->fetch_assoc()["nbDiscussion"];
		
        echo json_encode(["nbDiscussion"=>$jsonNbDis,"data"=>$jsonData]);

        exit();
    } else {
    	$sql="SELECT `discussion`.idDiscussion as idDiscussion, `titre`, `dateCréation`, discussion.username, 
			(SELECT COUNT(*) FROM discussion 
			JOIN message ON message.idDiscussion=discussion.idDiscussion) as messages FROM `discussion` 
		LEFT JOIN discussion_possede_categorie on discussion_possede_categorie.idDiscussion=discussion.idDiscussion 
		LEFT JOIN categorie on categorie.idCategorie=discussion_possede_categorie.idCategorie 
		WHERE titre LIKE ? OR nom LIKE ? ORDER BY dateDernierMessage DESC limit 10 offset ".strval(($data['page']-1)*10);
		$recherche="%".$recherche."%";
		$result = sgbd_execute_prepared_requete($sql, [$recherche, $recherche]); //sgbd_execute_prepared_requete($reqToPrepare, $param);
		$jsonData = $result->fetch_all(MYSQLI_ASSOC);
        
		$sql="SELECT COUNT(*) as nbDiscussion FROM `discussion`";
		$result = sgbd_execute_requete($sql);
		$jsonNbDis = $result->fetch_assoc()["nbDiscussion"];
		
        echo json_encode(["nbDiscussion"=>$jsonNbDis,"data"=>$jsonData]);
    };

}

?>
