<?php
include_once("bdd_connection.php");

//vérification de l'existence du json envoyant les données



$user = $_POST['pseudo'];
$mdp = $_POST['mdp'];
creation_compte($user, $mdp);


function creation_compte($user, $mdp){
    //vérification de la non existence de l'utilisateur
    $req = "SELECT COUNT(username) as nb FROM compte WHERE username='".$user."';" ;
    $rep = sgbd_execute_requete($req);
    if (mysqli_fetch_array($rep)['nb'] != 0) {
        //retourner erreur création compte
        echo "erreur pseudo existant";
        $jsonError  = array("type" => "error", "response" => "Le pseudonyme n'est pas disponible");
        echo json_encode($jsonError);
break;
    }
    else {
        $mdp = password_hash($mdp, PASSWORD_BCRYPT); //encryptage du mot de passe dans la base de données
        $req = "INSERT INTO compte(username,mdp) VALUES ('$user','$mdp');";
        echo $req;
        $rep = sgbd_execute_requete($req);
        //connecter l'utilisateur sur sa page
        session_start();
        $_SESSION["username"] = $user;
        $jsonReturn  = array("type" => "pseudo", "response" => "OK");
        echo json_encode($jsonReturn);
    };
};

?>