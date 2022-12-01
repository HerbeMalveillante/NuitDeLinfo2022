<?php  
// --- Fonction d'execution de requete dans la base ---
$dbhost = 'localhost';
$dblogin='root';
$dbpass='';
$dbname='u252724467_adp';

function sgbd_execute_requete($req) {
    global $dbhost, $dblogin, $dbpass, $dbname;

    // connexion
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $db = new mysqli($dbhost, $dblogin, $dbpass, $dbname, 3306);
    $db->set_charset('utf8mb4');

    if ($db->connect_errno) {
        $msg = "Echec lors de la connection MySQL : (";
        $msg.= $db->connect_errno;
        $msg.= ") ";
        $msg.= $db->connect_error;
        die ($msg);
    } else {
        $data = $db->query($req);
        $db->close();

        return $data;
    }
}

function sgbd_execute_prepared_requete($reqToPrepare, $param, $isProducingResult=true) {
    // $reqToPrepare : str de SQL avec placeholder (?)
    // $param : array de type [$donnee1, $donnee2, ...]
    // $isProducingResult : bool
    global $dbhost, $dblogin, $dbpass, $dbname;

    // connexion
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $db = new mysqli($dbhost, $dblogin, $dbpass, $dbname, 3306);
    $db->set_charset('utf8mb4');
    
    $stmt = $db->stmt_init();
    $stmt->prepare($reqToPrepare);
    $stmt->bind_param('s', ...$param);
    $stmt->execute();
    if ($isProducingResult) {
        $result = $stmt->get_result();

        return $result;
    }

    return $stmt;
}
?>
