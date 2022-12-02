<?php
include_once("bdd_connection.php");

//vérification de l'existence du json envoyant les données

if (!isset($_POST["json"])){
    exit("an error has occured");
};

$data = json_decode($_POST["json"], true);

$action = $data['action'];

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
}

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
}


function connexion($user, $mdp){
    //vérification de l'existence de l'utilisateur
    $req = 'SELECT COUNT(username) as nb FROM compte WHERE username="'.$user.'";';
    $rep = sgbd_execute_requete($req);
    if (mysqli_fetch_array($rep)['nb'] != 1) {//Si il n'y a aucun utilisateur avec ce nom dans la base, on renvoie un message d'erreur
        //retourner erreur connexion
        $jsonError  = array("type" => "error", "response" => "Le pseudonyme et le mot de passe ne correspondent pas à un compte existant");
        echo json_encode($jsonError);
    }
    else{
        //vérification du mot de passe
        $req = 'SELECT mdp FROM compte WHERE username="'.$user.'";';
        $rep = sgbd_execute_requete($req);
        if (password_verify($mdp, mysqli_fetch_array($rep)['mdp'])){
            //retourner message erreur de connexion
            $jsonError  = array("type" => "error", "response" => "Le pseudonyme et le mot de passe ne correspondent pas à un compte existant");
            echo json_encode($jsonError);
        }
        else{
            //connecter l'utilisateur
            session_start();
            $_SESSION["username"] = $user;
            $jsonReturn  = array("type" => "Session", "response" => "OK");
            echo json_encode($jsonReturn);
        };
    }

};

function creation_compte($user, $mdp){
    //vérification de la non existence de l'utilisateur
    $req = "SELECT COUNT(username) as nb FROM compte WHERE username='".$user."';" ;
    $rep = sgbd_execute_requete($req);
    if (mysqli_fetch_array($rep)['nb'] != 0) {
        //retourner erreur création compte
        $jsonError  = array("type" => "error", "response" => "Le pseudonyme n'est pas disponible");
        echo json_encode($jsonError);
    }
    else {
        $mdp = password_hash($mdp, PASSWORD_BCRYPT); //encryptage du mot de passe dans la base de données
        $req = "INSERT INTO compte(username,mdp) VALUES ('$user','$mdp');";
        $rep = sgbd_execute_requete($req);
        //connecter l'utilisateur sur sa page
        session_start();
        $_SESSION["username"] = $user;
        $jsonReturn  = array("type" => "pseudo", "response" => "OK");
        echo json_encode($jsonReturn);
    };
};

?>
