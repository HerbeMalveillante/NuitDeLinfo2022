function sendAjaxJSON(url, cFunction, donnees) {
    // url : url du fichier php
    // cFunction : nom de la fct qui utilise les données renvoyées, "" si pas de fct
    // donnees : json des données à envoyer
    const xhttp = new XMLHttpRequest();
    if (cFunction!="") {
        xhttp.onload = function () {
            cFunction(this);
        };
    }
    xhttp.open("POST", url);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("json=" + encodeURIComponent(JSON.stringify(donnees)));
}

// ------------------------------------------ Check Session ------------------------------------------
function usingCheckSession(xhttp) {
    const myObj = JSON.parse(xhttp.responseText);

    // Error : pas de session
	if (myObj["response"] == 1) {
		window.location.href = "PHP/logout.php";
	}
}

const jsonCheckSession = {
	action: "SESSION",
};
sendAjaxJSON("PHP/compteAdmin.php", usingCheckSession, jsonCheckSession);

window.onload = function() {
    // Stock de l'idCompte obtenu par l'url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idCompte = urlParams.get('idCompte')

    // ------------------------------------------ Collecte Info Discussion
    function usingDataMessage(xhttp) {
        const myObj = JSON.parse(xhttp.responseText);

    }

    var jsonInfoDiscussion = {action:"INFODISCUSSION", idDiscussion:idCompte};
    sendAjaxJSON("PHP/compteAdmin.php", usingDataMessage, jsonInfoDiscussion);
}