### Version 1.5
- Correction manifest.json

### Version 1.4
- Utilise l'API dns.google. Cette version ajoute la vérification du serveur d'envoi et du domaine de l'adresse e-mail de l'expéditeur via l'API publique de Google DNS. Cela permet d'effectuer des vérifications de sécurité sur l'adresse e-mail en question (par exemple, vérifier les enregistrements SPF ou obtenir l'IP associée à un domaine d'envoi).

### Version 1.3
- Changement de nom, pour plus de clarté.

### Version 1.2
- **Optimisation du code** : Simplification et refactorisation du fichier `popup.js` pour améliorer la lisibilité et la maintenabilité, sans changer le comportement ou les fonctionnalités du plugin.

### Version 1.1
- Première version stable de **SendInspecteur**, ajout de la fonctionnalité d'affichage des serveurs de transit et vérification des domaines d'expéditeur.
- Permet de détecter les incohérences et d'aider à prévenir le phishing et l'usurpation d'identité.

## SendInspecteur
**SendInspecteur** est une extension conçue pour aider les utilisateurs à détecter les tentatives d'usurpation d'identité et le phishing dans leurs e-mails. Ce module affiche les serveurs de transit associés aux messages reçus, permettant ainsi de vérifier la légitimité des expéditeurs et d'identifier toute incohérence dans les informations de l'expéditeur.

### Fonctionnalités principales :
- **Affichage des serveurs de transit** : Visualisez les serveurs d'envoi des e-mails reçus dans votre boîte de réception.
- **Vérification des domaines d'expéditeur** : Comparez le domaine de l'adresse e-mail avec les serveurs de transit pour détecter les incohérences.
- **Protection contre le phishing** : Utilisez ces informations pour repérer les messages suspects et éviter les arnaques par usurpation d'identité.

### Comment ça marche ?
Lorsque vous recevez un e-mail, cliquez sur le bouton **SendInspecteur** dans la barre d'outils ou le menu contextuel, et il analysera les en-têtes du message pour extraire les informations sur les serveurs de transit. Ces données seront affichées pour vous permettre de vérifier la cohérence avec le domaine de l'expéditeur.

### Pourquoi l'utiliser ?
- **Protégez-vous contre le phishing et les arnaques par usurpation d'identité.**
- **Obtenez des informations détaillées sur l'origine de chaque message pour renforcer votre sécurité.**

### Installation :
1. Téléchargez et installez l'extension via le [répertoire des modules Thunderbird](https://addons.thunderbird.net).
2. Une fois installé, **SendInspecteur** s'intègre directement à votre interface Thunderbird. Ouvrez un e-mail, cliquez sur le bouton du plugin et les informations sur les serveurs de transit seront affichées.

## Informations pour le réviseur
Le plugin **SendInspecteur** ne nécessite aucune connexion à un serveur externe. 
Il fonctionne entièrement en local et analyse les informations des e-mails reçus dans Thunderbird sans nécessiter de compte ou de serveur de test.
Aucune information de connexion ou de serveur externe n'est requise pour tester ce plugin.
