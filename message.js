function sendAjaxJSON(url, cFunction, donnees) {
	// url : url du fichier php
	// cFunction : nom de la fct qui utilise les données renvoyées, "" si pas de fct
	// donnees : json des données à envoyer
	const xhttp = new XMLHttpRequest();
	if (cFunction != "") {
		xhttp.onload = function () {
			cFunction(this);
		};
	}
	xhttp.open("POST", url);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("json=" + encodeURIComponent(JSON.stringify(donnees)));
}

window.onload = function () {
	// Stock de l'idDiscussion obtenu par l'url
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const idDiscussion = urlParams.get("idDiscussion");

	// ------------------------------------------ Collecte Info Discussion ------------------------------------------
	function usingDataDiscussion(xhttp) {
		const myObj = JSON.parse(xhttp.responseText);

		document.getElementById("titreDiscussion").innerText = myObj.titre;
		document.getElementById("descDiscussion").innerText = myObj.description;
	}

	var jsonInfoDiscussion = { action: "INFODISCUSSION", idDiscussion: idDiscussion };
	sendAjaxJSON("PHP/message.php", usingDataDiscussion, jsonInfoDiscussion);

	var nbMessage = 0;
	// ------------------------------------------ Load Data Message ------------------------------------------
	function usingDataMessage(xhttp) {
		const myObj = JSON.parse(xhttp.responseText);
		document.getElementById("titreDiscussion").innerHTML;

		for (let i = 0; i < myObj.length; i++) {
			nbMessage++;
			const elementJSON = myObj[i];
			console.log(elementJSON);

			document.getElementById("titreDiscussion").innerHTML +=
				`<div class="ml-5 mb-2">
                                    <div class="flex gap-2">
                                        <svg class="w-10" data-jdenticon-value="` +
				elementJSON.username +
				`"></svg>
                                        <div class="flex flex-col">
                                            <span class="text-pink-800 text-xl font-semibold">` +
				elementJSON.username +
				`</span>
                                            <span class="text-gray-400 text-sm">` +
				elementJSON.dateMessage +
				`</span>
                                        </div>
                                    </div>
                                    <div class="pl-2">
                                        <p class="text-gray-800">
                                        ` +
				elementJSON.content +
				`
                                        </p>
                                    </div>
                                </div>`;
		}
	}

	var jsonDataMessage = { action: "LOADMESSAGE", idDiscussion: idDiscussion, nbMessage: 0 };
	sendAjaxJSON("PHP/message.php", usingDataMessage, jsonDataMessage);

	function usingPostMessage(xhttp) {
		const myObj = JSON.parse(xhttp.responseText);

		if (myObj.response == 1) {
			alert("Message envoyé");
		} else {
			alert("Erreur lors de l'envoi du message. Êtes-vous connecté ?");
		}
	}

	var buttonSubmit = document.getElementById("submit");
	buttonSubmit.addEventListener("click", function () {
		var content = document.getElementById("content").value;
		var jsonDataMessage = { action: "ADDMESSAGE", idDiscussion: idDiscussion, content: content };
		sendAjaxJSON("PHP/message.php", usingPostMessage, jsonDataMessage);
		var jsonDataMessage = { action: "LOADMESSAGE", idDiscussion: idDiscussion, nbMessage: nbMessage };
		sendAjaxJSON("PHP/message.php", usingDataMessage, jsonDataMessage);
	});
};
