function sendAjaxJSON(url, cFunction, donnees) {
	// url : url du fichier php
	// cFunction : nom de la fct qui utilise les données renvoyées
	// donnees : json des données à envoyer
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
		cFunction(this);
	};
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
