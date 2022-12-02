<?php
include_once("bdd_connection.php");

//vérification de l'existence du json envoyant les données

if (!isset($_POST["json"])){
    exit("an error has occured");
};

$data = json_decode($_POST["json"], true);

$action = $data['action'];

if ($action == "connexion"){
    $user =trim($data['pseudo']);
    $mdp = trim($data['mdp']);
    connexion($user, $mdp);
};


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

?>