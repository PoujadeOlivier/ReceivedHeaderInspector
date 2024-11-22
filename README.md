# ReceivedHeaderInspector ![alt text](https://github.com/PoujadeOlivier/ReceivedHeaderInspector/blob/main/src/images/bouclier-32px.png)
<b>Addon Thunderbird</b>

<b>**[ReceivedHeaderInspector](https://addons.thunderbird.net/fr/thunderbird/addon/receivedheaderinspector/) **</b> est une extension conçue pour aider les utilisateurs à détecter les tentatives d'usurpation d'identité (spoofing) et de phishing dans leurs e-mails. Elle analyse les en-têtes "Received" des messages reçus et affiche les serveurs de transit utilisés pour acheminer l'e-mail, permettant ainsi de vérifier la légitimité de l'expéditeur et d'identifier toute incohérence.

L'extension utilise l'API publique de Google DNS (https&#58;//dns.google/resolve) pour vérifier les informations du serveur d'envoi et du domaine de l'adresse e-mail de l'expéditeur. Cela permet de réaliser des vérifications de sécurité, comme la validation des enregistrements SPF ou l'obtention de l'adresse IP associée au domaine de l'expéditeur.

## ReceivedHeaderInspector 1.5

<b>Exemple 01 :</b>

![alt text](https://github.com/PoujadeOlivier/ReceivedHeaderInspector/blob/main/Ressources/ExempleSpoofing01.jpg)

<b>Exemple 02 :</b>

![alt text](https://github.com/PoujadeOlivier/ReceivedHeaderInspector/blob/main/Ressources/ExempleSpoofing02.jpg)
