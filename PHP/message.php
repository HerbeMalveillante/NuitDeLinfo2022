<?php
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

// ------------------------------------------ Renvoi Info Discussion ------------------------------------------
// Envoi JSON : {action:INFODISCUSSION, idDiscussion:int()} 
if ($data['action']=="INFODISCUSSION" ) {
    
    $sql="SELECT `titre`, `dateCréation`, `username` FROM `discussion` 
            WHERE idDiscussion=".$data['idDiscussion'];
    $result = sgbd_execute_requete($sql);
    $jsonData = $result->fetch_all(MYSQLI_ASSOC);
    
    echo json_encode($jsonData);

    exit();

}

// ------------------------------------------ Renvoi Data Message ------------------------------------------
// Envoi JSON : {action:LOADMESSAGE, idDiscussion:int(), nbMessage:int()} 
if ($data['action']=="LOADMESSAGE" ) {
    
    $sql="SELECT `idMessage`, `dateMessage`, `content`, `username` FROM `message`
            WHERE idDiscussion=".$data['idDiscussion']."
            ORDER BY dateMessage limit 10 offset ".strval($data['nbMessage']);
    $result = sgbd_execute_requete($sql);
    $jsonData = $result->fetch_all(MYSQLI_ASSOC);
    
    echo json_encode($jsonData);

    exit();
}

// ------------------------------------------ Ajout Message ------------------------------------------
// Envoi JSON : {action:ADDMESSAGE, idDiscussion:int(), content:str()}
if ($data['action']=="ADDMESSAGE" ) {
    $_SESSION['username']="Johnson";
    
    $sql="INSERT INTO `message`( `dateMessage`, `content`, `idDiscussion`, `username`) VALUES 
            (NOW(), ?,".$data['idDiscussion'].",'".$_SESSION['username']."')";
    $id = sgbd_execute_prepared_requete($sql, [$data['content']], false);

    $sql="UPDATE `discussion` SET `dateDernierMessage `=NOW()
            WHERE idDiscussion=6";

    exit();
}

?>