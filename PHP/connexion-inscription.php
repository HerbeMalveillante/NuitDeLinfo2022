<?php
include_once("bdd_connection.php");

//vérification de l'existence du json envoyant les données

if (!isset($_POST["json"])){
    exit("an error has occured");
};

$data = json_decode($_POST["json"], true);

$action = $data['action'];

session_start();

if ($data['action']=="SESSION" ) {

	// Il n'y a pas de session
	if (!isset($_SESSION['username'])) {
		$jsonError = ["response" => 1];

		echo json_encode($jsonError);

		exit();
	} else {
		$jsonError = ["response" => 0];
		echo json_encode($jsonError);

		exit();
	}
};

if ($action == "connexion"){
    $user = trim($data['pseudo']);
    $mdp = trim($data['mdp']);
    
    $req = "SELECT COUNT(username) as nb FROM compte WHERE username LIKE '$user'";
    $rep = sgbd_execute_requete($req);

    if (mysqli_fetch_array($rep)['nb'] == 0){ //si le pseudo n'est pas présent dans la base, on créé un nouveau compte
        creation_compte($user, $mdp);
    }
    else{ //sinon on connecte l'utilisateur sur son compte
        connexion($user, $mdp);
    }
};


function connexion($user, $mdp){
    //vérification du mot de passe
    $req = 'SELECT mdp FROM compte WHERE username="'.$user.'";';
    $rep = sgbd_execute_requete($req);
    if ($mdp == mysqli_fetch_array($rep)['mdp']){
        //connecter l'utilisateur
        $_SESSION["username"] = $user;
        $jsonReturn  = array("type" => "Session", "response" => "OK");
        echo json_encode($jsonReturn);
    }
    else{
        //retourner message erreur de connexion
        $jsonError  = array("type" => "error", "response" => "Le pseudonyme et le mot de passe ne correspondent pas à un compte existant");
        echo json_encode($jsonError);
    };
};


function creation_compte($user, $mdp){
    $req = "INSERT INTO compte(username,mdp) VALUES ('$user','$mdp');";
    $rep = sgbd_execute_requete($req);
    //connecter l'utilisateur sur sa page
    $_SESSION["username"] = $user;
    $jsonReturn  = array("type" => "pseudo", "response" => "OK");
    echo json_encode($jsonReturn);
    };

?>
