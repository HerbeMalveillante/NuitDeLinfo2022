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

function refValues($arr){
    if (strnatcmp(phpversion(),'5.3') >= 0) //Reference is required for PHP 5.3+
    {
        $refs = array();
        foreach($arr as $key => $value)
            $refs[$key] = &$arr[$key];
        return $refs;
    }
    return $arr;
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
    // nb de valeur dans $params pour le "s"
    $strTypes="";
    for ($i=0; $i < count($param); $i++) { 
        $strTypes.="s";
    }
    $stmt->bind_param($strTypes, ...$param );
    $stmt->execute();
    if ($isProducingResult) {
        $result = $stmt->get_result();

        return $result;
    }

    return $stmt;
}

function execute_requete_return_last_id($req) {
	// connexion
    global $dbhost, $dblogin, $dbpass, $dbname;
	$db = new mysqli($dbhost, $dblogin, $dbpass, $dbname, 3306);

	if ($db->connect_errno) {
		$msg = "Echec lors de la connection MySQL : (";
		$msg.= $db->connect_errno;
		$msg.= ") ";
		$msg.= $db->connect_error;
		die ($msg);
	} else {
		$db->query($req);
		$id=mysqli_insert_id($db);
		$db->close();

		return $id;
	}
}
?>
