<?php
include_once("bdd_connection.php");

//vérification de l'existence du json envoyant les données
if (!isset($_POST["json"])){ //  || !isset($_SESSION["username"])
    exit("an error has occured");
};

$data = json_decode($_POST["json"], true);

#$_POST['categories'] = ["cat1", "cat2", "cat3"];

if (!isset($data['titre'])){
    exit("an error has occured");
};
if (!isset($data['categories'])){
    exit("an error has occured");
};
if (!isset($data['contenu'])){
    exit("an error has occured");
};
if (!isset($data['action'])){
    exit("an error has occured");
};

$user = "Patrick"  //$user = $_SESSION["username"];
$titre = trim($data['titre']);
$categories = trim($data['categories']); //une liste
$description = trim($data['description']);
$action = trim($data['action']);

$jsonReturn  = array("type" => "creation discussion", "response" => "Discussion créée avec succès");
echo json_encode($jsonReturn);
if ($action == "post"){
    creation_discussion($user, $titre, $categories);
}
elseif ($action == "categories"){
    envoyer_catégories();
};

function creation_discussion($user, $titre, $categories){

    //Stockage de la date et de l'heure actuelle
    $date = new Datetime();
    $date_actuelle = $date->format("Y-m-d h:i:s");
    $req = "INSERT INTO discussion(titre,dateCréation,username,description) VALUES('$titre',NOW(),'$user','$description')";
    $id = execute_requete_return_last_id($req); //permet d'executer la requete et de retourner l'id créé par l'auto-increment

    foreach ($categories as $categ){
        $req = "SELECT idCategorie FROM categorie WHERE nom = '$categ'";
        $rep = sgbd_execute_requete($req);
        $idCategorie = mysqli_fetch_array($rep)['idCategorie'];
        $req = "INSERT INTO discussion_possede_categorie(idDiscussion, idCategorie) VALUES($id,$idCategorie)";
        $rep = sgbd_execute_requete($req);
    };
    //
    $jsonReturn  = array("type" => "creation discussion", "response" => "Discussion créée avec succès");
    echo json_encode($jsonReturn);
    };

function envoyer_catégories(){
    $req = 'SELECT nom FROM categorie ;';
    $rep = sgbd_execute_requete($req);
    $listeCat = mysqli_fetch_array($rep)['nom'];
    $jsonReturn  = array("type" => "retour catégories", "response" => $listeCat);
    echo json_encode($jsonReturn);
};

?>
