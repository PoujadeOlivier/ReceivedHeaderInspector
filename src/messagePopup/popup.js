//#####################################
//#####################################
//####Fonctions pour interroger l'API GOOGLE https://dns.google/resolve?


// Fonction pour résoudre le domaine et obtenir les adresses IP associées
async function resolveDomain(domain) {
    const url = `https://dns.google/resolve?name=${domain}&type=A`; // Utilisation de Google DNS API pour récupérer l'IP
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Answer) {
            const ipAddresses = data.Answer.map(entry => entry.data); // Récupérer les adresses IP
			//console.log(ipAddresses);
            return ipAddresses;
        } else {
            console.log("Aucune IP trouvée pour le domaine:", domain);
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des IP du domaine:", error);
        return null;
    }
}

// Fonction pour récupérer l'enregistrement SPF du domaine
async function getSPFRecord(domain) {
    const url = `https://dns.google/resolve?name=${domain}&type=TXT`; // Requête pour récupérer les enregistrements TXT (SPF)
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Authority) {
			const spfRecords = data.Authority.map(entry => entry.data); // Récupérer les enregistrements SPF, cas réponse Authority
			//console.log(spfRecords);
            return spfRecords;
        } else if (data.Answer) {
			const spfRecords = data.Answer.map(entry => entry.data); // Récupérer les enregistrements SPF, cas réponse Answer
			//console.log(spfRecords);
            return spfRecords;
        } else {
            console.log("Aucun enregistrement SPF trouvé pour ce domaine.");
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de l'enregistrement SPF:", error);
        return null;
    }
}


//#####################################
//#####################################






//Vous devez utiliser async dans une fonction si cette fonction 
//utilise des opérations asynchrones (comme fetch(), setTimeout(), ou Promise). 

// From: "test.detection@hotmail.com" <sender@e9mail.com>
function extractEmail(fromHeader) {
    let email = null;

    // Vérifie si l'adresse e-mail est encadrée par < >
    const match = fromHeader.match(/<([^>]+)>/);
    if (match) {
        // Récupère l'adresse e-mail entre les chevrons
        email = match[1];
    } else {
        // Pas de chevrons, cherche une adresse e-mail simple
        const simpleMatch = fromHeader.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        if (simpleMatch) {
            email = simpleMatch[0];
        }
    }

    return email;
}






async function analyzeEmailHeaders() {
    try {
		
		//le dernier serveur est le serveur de distribution
		//donc notre serveur de mail
		//ça ne m'intéresse pas de le tracer
		let PremierPassage = 'Oui';
		
        // Obtenir le message affiché dans l'onglet actuel
		// The user clicked our button, get the active tab in the current window using
		// the tabs API.
        let tabs = await messenger.tabs.query({ active: true, currentWindow: true });
		// Get the message currently displayed in the active tab, using the
		// messageDisplay API. Note: This needs the messagesRead permission.
		// The returned message is a MessageHeader object with the most relevant
		// information.		
        let message = await messenger.messageDisplay.getDisplayedMessage(tabs[0].id);

        if (!message) {
            console.error("Aucun message affiché.");
            return;
        }
		
		
		// Mettre à jour les champs HTML avec le sujet et l'auteur du message
        document.getElementById("subject").textContent = message.subject || "Sujet indisponible";
        document.getElementById("from").textContent = message.author || "Auteur indisponible";
		



	
        // Obtenir le contenu complet du message
        let full = await messenger.messages.getFull(message.id);

		let sender = '';
		
		// Normalisation de la casse de l'en-tête "sender"
		const senderHeaders = [
			'sender', 
			'X-sender', 
			'Sender'
		];
		
		// On vérifie chaque clé de l'en-tête, en ignorant la casse
		for (let header of senderHeaders) {
			if (full.headers[header]) {
				sender = full.headers[header];
				break; // Si on trouve, on s'arrête ici
			}
		}
		
		// Si c'est un tableau, on prend le premier élément
		if (Array.isArray(sender)) {
			sender = sender[0];
		}
		//si ce n'est pas un tableau, 1 occurence, sender = sender  , donc rien à faire
		
		document.getElementById("sender").textContent = sender || "";
		
		


        // Extraire les en-têtes "Received" complets
        let receivedHeader = full.headers["received"];

        // Préparer un tableau pour stocker les résultats
        let extractedServers = [];
		extractedServers['Ip'] = [];
		extractedServers['Hostname'] = [];


		let ipRegex = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g;

		let hostnameRegex = /\b(?=[^\s]*[a-zA-Z])[^\s=+]+(?:\.[^\s=+]+)+\b/g;      //1 point minimum , prend tous les caractères sauf les espaces (même les spéciaux) sans = ni +
		
        // Appliquer l'expression régulière sur chaque ligne "Received"
        if (Array.isArray(receivedHeader)) {

            for (let line of receivedHeader) {


				// il faut réinitialiser l'expression régulière avec le drapeau global g en définissant sa propriété lastIndex à zéro avant de l'utiliser à nouveau. 
				// Cela garantit que l'exécution de exec commence toujours au début de la chaîne.
				hostnameRegex.lastIndex = 0;
				ipRegex.lastIndex = 0;

				
				let hostname = hostnameRegex.exec(line);
				let ip = ipRegex.exec(line);

				if(hostname)
				hostname = hostname['0'];
				if(ip)
				ip = ip['0'];

		if ( hostname ) {
			if(PremierPassage != 'Oui')
			extractedServers['Hostname'].push(hostname);
			
			PremierPassage = 'Non';
		}
		
		if (ip) {
			extractedServers['Ip'].push(ip);
		}
				

  
				
            }
        } else if (receivedHeader) {

				
				let line = receivedHeader;
				
				hostnameRegex.lastIndex = 0;
				ipRegex.lastIndex = 0;

				
				let hostname = hostnameRegex.exec(line);
				let ip = ipRegex.exec(line);

				if(hostname)
				hostname = hostname['0'];
				if(ip)
				ip = ip['0'];

		if ( hostname ) {
			if(PremierPassage != 'Oui')
			extractedServers['Hostname'].push(hostname);
			
			PremierPassage = 'Non';
		}
		
		if (ip) {
			extractedServers['Ip'].push(ip);
		}


        }



		//Inverser les tableaux de resultat
		//extractedServers['Hostname'] = extractedServers['Hostname'].reverse();		
		//extractedServers['Ip'] = extractedServers['Ip'].reverse();		
		
		
		//Alerte sécurité sur l'utilisation de innerHTML par le dépôt Thunderbird
		//document.getElementById("hostname").innerHTML  = extractedServers['Hostname'];
        //document.getElementById("ip").innerHTML  = extractedServers['Ip'];
		

		let container = document.getElementById('hostname');
		
	
		// Boucle sur chaque mot et crée un paragraphe pour chaque mot
		extractedServers['Hostname'].forEach(mot => {
			const span = document.createElement('span');  // Utiliser <span> au lieu de <p>
			span.textContent = mot;  // Ajoute le mot à l'élément <span>
			container.appendChild(span);  // Ajoute le <span> à l'élément container
		
			// Ajouter un retour à la ligne en utilisant une balise <br>
			container.appendChild(document.createElement('br'));
		});	



		container = document.getElementById('ip');
	
		// Boucle sur chaque mot et crée un paragraphe pour chaque mot
		extractedServers['Ip'].forEach(mot => {
			const span = document.createElement('span');  // Utiliser <span> au lieu de <p>
			span.textContent = mot;  // Ajoute le mot à l'élément <span>
			container.appendChild(span);  // Ajoute le <span> à l'élément container
		
			// Ajouter un retour à la ligne en utilisant une balise <br>
			container.appendChild(document.createElement('br'));
		});	






if( extractedServers['Ip']['0'] && extractedServers['Hostname']['0'] )
{



container = document.getElementById('qequoi1');
const span01 = document.createElement('span');
span01.textContent = extractedServers['Hostname']['0'];
span01.style.color = "blue";
span01.style.fontWeight = "bold";
container.appendChild(span01);
//container.appendChild(document.createElement('br'));
 
 
resolveDomain(extractedServers['Hostname']['0']).then(ips => {
    if (ips) {
        // Tu peux maintenant utiliser les résultats dans `ips`
        //console.log(ips);
		
		container = document.getElementById('apireverseip');
		const span02 = document.createElement('span');
		span02.textContent = ips.join(", ");
		container.appendChild(span02);
		//container.appendChild(document.createElement('br')); // Ajoute une ligne vide		

		
    } else {
        console.log("Aucune IP trouvée pour le domaine.");
    }
});

getSPFRecord(extractedServers['Hostname']['0']).then(spfRecords => {
    if (spfRecords) {
        // Tu peux maintenant utiliser les résultats dans `spfRecords`
        //console.log(spfRecords);
		
		container = document.getElementById('apispfserveur');
		const span03 = document.createElement('span'); // Crée un élément <span>
		span03.textContent = spfRecords.join(", ");
		container.appendChild(span03);
		//container.appendChild(document.createElement('br')); // Ajoute une ligne vide		
		
    } else {
        console.log("Aucune IP SPF trouvée pour le domaine.");
    }
});


    // Utiliser une expression régulière pour extraire le domaine de l'email
	
	//déjà je récupère l'email de la ligne From : message.author
	//exemple de FROM : From: "test.detection@hotmail.com" <sender@e9mail.com>
	const email = extractEmail(message.author);
	//console.log('email:', email);
    const regex = /@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
    //const match = message.author.match(regex);
    const domaine = email.match(regex);
	//console.log('domaine:', domaine[1]);
	
	//je traite la requete spf, seulement si le domaine du mail est différent du domaine du serveur d'envoi, déjà traité
    if (domaine && domaine[1] && domaine[1]!=extractedServers['Hostname']['0'] ) {
        // Le domaine est le premier groupe capturé par la regex
        //console.log('Domaine extrait:', domaine[1]);

		container = document.getElementById('qequoi2');
		const span04 = document.createElement('span'); // Crée un élément <span>
		span04.textContent = domaine[1];
		span04.style.color = "blue";
		span04.style.fontWeight = "bold";
		container.appendChild(span04); // Ajoute le premier texte
		//container.appendChild(document.createElement('br')); // Ajoute une ligne vide


		//ensuite je lance la requete spf
		getSPFRecord(domaine[1]).then(spfRecords => {
			if (spfRecords) {
				// Tu peux maintenant utiliser les résultats dans `ips`
				//console.log(spfRecords);
				//console.log(spfRecords.join(", "));
				
				container = document.getElementById('apispfemail');
				const span05 = document.createElement('span'); // Crée un élément <span>
				// Convertir l'array `spfRecords` en chaîne de texte, chaque entrée séparée par une virgule
				span05.textContent = spfRecords.join(", ");
				container.appendChild(span05); // Ajoute le premier texte
				//container.appendChild(document.createElement('br')); // Ajoute une ligne vide			
				
			} else {
				console.log("Aucune IP SPF trouvée pour le domaine.");
			}
		});


    }	
	



}







    } catch (error) {
        console.error("Une erreur s'est produite lors du traitement de l'email :", error);

        // En cas d'erreur, afficher un message d'erreur dans les champs HTML
        document.getElementById("subject").textContent = "Erreur : Impossible de récupérer le sujet";
        document.getElementById("from").textContent = "Erreur : Impossible de récupérer l'expéditeur";
        document.getElementById("received").textContent = "Erreur : Impossible de récupérer le serveur";
    }
}

// Appeler la fonction d'analyse
analyzeEmailHeaders();
