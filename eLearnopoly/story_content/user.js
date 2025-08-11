window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
window.Script1 = function()
{
  // Récupérer les rectangles
const rectangle1 = object('5fUWgYp4Hvu');
const rectangle2 = object('5Y2EY1Lkp7V');
const rectangle3 = object('67gRCwCPS8u');
const rectangle4 = object('5evEB0IZ2wu');
const rectangle5 = object('5m5teDgANLR');

// Liste des rectangles
const rectangles = [rectangle1, rectangle2, rectangle3, rectangle4, rectangle5];

// Hauteur initiale supposée (en pixels) - À REMPLACER par la vraie valeur
const initialHeight = 85; // Vérifiez dans Storyline et mettez à jour si possible

// Débogage : Vérifier si les rectangles sont récupérés
rectangles.forEach((rect, index) => {
    if (rect) {
        console.log(`Rectangle ${index + 1} récupéré :`, rect);
    } else {
        console.log(`Rectangle ${index + 1} non récupéré (null ou undefined)`);
    }
});

// Animer chaque rectangle
rectangles.forEach((rect, index) => {
    if (rect) {
        gsap.to(rect, {
            scaleY: 1.5 + Math.random() * 2, // Échelle aléatoire (1.5x à 3.5x)
            //transformOrigin: 'bottom', // Ancrer l'étirement au bas
            duration: 0.4 + Math.random() * 0.3, // Durée aléatoire (0.4s à 0.7s)
            repeat: -1, // Boucle infinie
            yoyo: true, // Retour à l'échelle initiale
            ease: 'power1.inOut', // Animation fluide
            delay: index * 0.1, // Décalage pour désynchroniser
        });
    }
});
}

window.Script2 = function()
{
  // Fonction globale pour gérer la position du joueur et déclencher le popup
function positionJoueur(joueur, pion) {
    // Récupérer l'objet cible et la zone de contenu
    let targetObject = document.querySelector(`[data-model-id='${pion}']`);
    let contentArea = document.querySelector('.slide-layer.base-layer.shown');
    let animationDone = false;

    // Récupérer la variable varPositionJX depuis Storyline
    let positionJX = player.GetVar("varPositionJ" + joueur);

    // Vérifier si les éléments nécessaires sont disponibles
    if (!targetObject || !contentArea || positionJX < 0) {
        console.error("Erreur : objet cible, zone de contenu ou positionJX invalide");
        return;
    }

    // Définir un tableau d'objets avec les positions x et y
    let positions = [
	    { x: 498, y: 58 },   // Position pour varPositionJ1 = 0
	    { x: 498, y: 58 },       // Position pour varPositionJ1 = 1
	    { x: 635, y: 58 },       // Position pour varPositionJ1 = 2
	    { x: 723, y: 58 },       // Position pour varPositionJ1 = 3
	    { x: 810, y: 58 },       // Position pour varPositionJ1 = 4
	    { x: 899, y: 58 },       // Position pour varPositionJ1 = 5
	    { x: 985, y: 58 },       // Position pour varPositionJ1 = 6
	    { x: 1078, y: 58 },       // Position pour varPositionJ1 = 7
	    { x: 1161, y: 58 },       // Position pour varPositionJ1 = 8
	    { x: 1249, y: 58 },       // Position pour varPositionJ1 = 9
	    { x: 1386, y: 58 },       // Position pour varPositionJ1 = 10
	    { x: 1386, y: 197 },       // Position pour varPositionJ1 = 11
	    { x: 1386, y: 286 },       // Position pour varPositionJ1 = 12
	    { x: 1386, y: 372 },       // Position pour varPositionJ1 = 13
	    { x: 1386, y: 458 },       // Position pour varPositionJ1 = 14
	    { x: 1386, y: 545 },       // Position pour varPositionJ1 = 15
	    { x: 1386, y: 634 },       // Position pour varPositionJ1 = 16
	    { x: 1386, y: 722 },       // Position pour varPositionJ1 = 17
	    { x: 1386, y: 808 },       // Position pour varPositionJ1 = 18
	    { x: 1386, y: 948 },       // Position pour varPositionJ1 = 19
	    { x: 1246, y: 948 },       // Position pour varPositionJ1 = 20
	    { x: 1161, y: 948 },       // Position pour varPositionJ1 = 21
	    { x: 1073, y: 948 },       // Position pour varPositionJ1 = 22
	    { x: 984, y: 948 },       // Position pour varPositionJ1 = 23
	    { x: 897, y: 948 },       // Position pour varPositionJ1 = 24
	    { x: 811, y: 948 },       // Position pour varPositionJ1 = 25
	    { x: 721, y: 948 },       // Position pour varPositionJ1 = 26
	    { x: 635, y: 948 },       // Position pour varPositionJ1 = 27
	    { x: 498, y: 948 },       // Position pour varPositionJ1 = 28
	    { x: 498, y: 808 },       // Position pour varPositionJ1 = 29
	    { x: 498, y: 722 },       // Position pour varPositionJ1 = 30
	    { x: 498, y: 633 },       // Position pour varPositionJ1 = 31
	    { x: 498, y: 546 },       // Position pour varPositionJ1 = 32
	    { x: 498, y: 460 },       // Position pour varPositionJ1 = 33
	    { x: 498, y: 372 },       // Position pour varPositionJ1 = 34
	    { x: 498, y: 284 },       // Position pour varPositionJ1 = 35
	    { x: 498, y: 198 },       // Position pour varPositionJ1 = 36
    ];

    if (positionJX >= positions.length) {
        console.error("Erreur : positionJX hors des limites du tableau");
        return;
    }

    // Dimensions originales dans Storyline
    let originalWidth = player.GetVar("varLecteurLargeur");
    let originalHeight = player.GetVar("varLecteurHauteur");

    // Taille réelle de la zone de contenu
    let actualWidth = contentArea.clientWidth;
    let actualHeight = contentArea.clientHeight;

    // Calculer les facteurs de mise à l'échelle
    let scaleX = actualWidth / originalWidth;
    let scaleY = actualHeight / originalHeight;

    // Récupérer les coordonnées cibles
    let targetX = positions[positionJX].x;
    let targetY = positions[positionJX].y;

    // Ajuster les positions cibles
    let adjustedX = targetX * scaleX;
    let adjustedY = targetY * scaleY;

    // Animer vers la position ajustée
    gsap.to(targetObject, {
        x: adjustedX,
        y: adjustedY,
        duration: 1,
        onComplete: () => {
            animationDone = true;
            // Appeler popupCase avec la positionJX après l'animation
            popupCase(joueur, positionJX);
        }
    });

    // Gérer le redimensionnement
    window.addEventListener('resize', function () {
        if (animationDone) {
            actualWidth = contentArea.clientWidth;
            actualHeight = contentArea.clientHeight;
            scaleX = actualWidth / originalWidth;
            scaleY = actualHeight / originalHeight;
            adjustedX = targetX * scaleX;
            adjustedY = targetY * scaleY;
            gsap.set(targetObject, { x: adjustedX, y: adjustedY });
        }
    });
}

window.positionJoueur = positionJoueur;

// Fonction globale pour l'ouverture de la fenêtre popup
function popupCase(joueurID, joueurCaseID) {
    // Liste des cases valides
    const validCases = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
    const caseID = parseInt(joueurCaseID);

    if (!validCases.includes(caseID)) {
        console.error("Case invalide:", caseID);
        return;
    }

    // Vérifier si un traitement est en cours ou même case
    let isProcessing = player.GetVar("varProcessing_J" + joueurID) || false;
    let lastCaseID = player.GetVar("varLastCaseID_J" + joueurID) || 0;
    if (isProcessing || lastCaseID === caseID) {
        console.log("Traitement en cours ou même case, popup ignoré");
        return;
    }

    // Marquer le traitement
    player.SetVar("varProcessing_J" + joueurID, true);
    player.SetVar("varLastCaseID_J" + joueurID, caseID);

    // Définir les données du switch
    let caseData;
    switch (caseID) {
    case 1:
      var ccp = "-";
      var intitule = "Nouveau tour de plateau";
      var type = "D";
      var theme = "Case Départ";
      var coutCPF = 0;
      var fraisCPF = 0;
      var effet = "Gagner 40 CPF";
      var message = "Un coup de boost pour votre persévérance !";
      var positionChange = 0;
      var cpfChange = 40;
      var actionSpeciale = "";
      break;
    case 2:
      var ccp = "1";
      var intitule = "Analyser une demande";
      var type = "C";
      var theme = "Conception pédagogique";
      var coutCPF = 20;
      var fraisCPF = 0;
      var effet = "Gagner 10 CPF";
      var message = "Votre analyse fine de la demande impressionne !";
      var positionChange = 0;
      var cpfChange = 10;
      var actionSpeciale = "Rédigez un diagnostic pédagogique en identifiant les besoins d'une entreprise fictive.";
      break;
    case 3:
      var ccp = "1";
      var intitule = "Structurer un parcours";
      var type = "J";
      var theme = "Case Joker";
      var coutCPF = 40;
      var fraisCPF = 0;
      var effet = "Avancer de 10 cases";
      var message = "Votre structure propulse votre progression !";
      var positionChange = parseInt(joueurCaseID) + 10;
      var cpfChange = 0;
      var actionSpeciale = "";
      break;
    case 4:
      var ccp = "1";
      var intitule = "Objectifs pédagogiques";
      var type = "C";
      var theme = "Conception pédagogique";
      var coutCPF = 20;
      var fraisCPF = 0;
      var effet = "Gagner 10 CPF";
      var message = "Vos objectifs sont clairs et mesurables !";
      var positionChange = 0;
      var cpfChange = 10;
      var actionSpeciale = "Formulez trois objectifs pédagogiques SMART pour un module eLearning.";
      break;
    case 5:
      var ccp = "1";
      var intitule = "Sélectionner des outils";
      var type = "NC";
      var theme = "Support - Conception pédagogique";
      var coutCPF = 0;
      var fraisCPF = 0;
      var effet = "Gagner 5 CPF";
      var message = "Vos outils renforcent vos compétences !";
      var positionChange = 0;
      var cpfChange = 5;
      var actionSpeciale = "";
      break;
    case 6:
      var ccp = "1";
      var intitule = "Conception de modules";
      var type = "C";
      var theme = "Conception pédagogique";
      var coutCPF = 30;
      var fraisCPF = 0;
      var effet = "Gagner 15 CPF";
      var message = "Votre module est engageant et bien structuré !";
      var positionChange = 0;
      var cpfChange = 15;
      var actionSpeciale = "Concevez un storyboard pour un module eLearning de 10 minutes.";
      break;
    case 7:
      var ccp = "1";
      var intitule = "Adopter des méthodes";
      var type = "NC";
      var theme = "Approche - Adopter des méthodes";
      var coutCPF = 0;
      var fraisCPF = 0;
      var effet = "Gagner 5 CPF";
      var message = "Vos méthodes dynamisent l’apprentissage !";
      var positionChange = 0;
      var cpfChange = 5;
      var actionSpeciale = "";
      break;
    case 8:
      var ccp = "1";
      var intitule = "Case Baraka";
      var type = "B";
      var theme = "Carte opportunité";
      var coutCPF = 0;
      var fraisCPF = 0;
      var effet = "Gagner 50 CPF";
      var message = "Une chance inattendue booste vos compétences !";
      var positionChange = 0;
      var cpfChange = 50;
      var actionSpeciale = "";
      break;
    case 9:
      var ccp = "1";
      var intitule = "Évaluation des apprenants";
      var type = "C";
      var theme = "Conception pédagogique";
      var coutCPF = 20;
      var fraisCPF = 0;
      var effet = "Gagner 10 CPF";
      var message = "Votre évaluation est pertinente et formative !";
      var positionChange = 0;
      var cpfChange = 10;
      var actionSpeciale = "Créez un quiz formatif avec 5 questions pour évaluer les acquis.";
      break;
    case 10:
      var ccp = "1";
      var intitule = "Changement salle";
      var type = "T";
      var theme = "";
      var coutCPF = 0;
      var fraisCPF = 40;
      var effet = "Payez 40 CPF, direction case 28";
      var message = "Le changement de salle coûte cher, direction la nouvelle salle !";
      var positionChange = 28;
      var cpfChange = -40;
      var actionSpeciale = "";
      break;
    case 11:
      var ccp = "1";
      var intitule = "Financement de votre formation";
      var type = "F";
      var theme = "Animation pédagogique";
      var coutCPF = 50;
      var fraisCPF = 50;
      var effet = "Rembourser 50 CPF";
      var message = "Une erreur dans le financement de votre formation a été constatée.";
      var positionChange = 0;
      var cpfChange = -50;
      var actionSpeciale = "";
      break;
    case 12:
      var ccp = "2";
      var intitule = "Préparer une séance";
      var type = "C";
      var theme = "Animation pédagogique";
      var coutCPF = 20;
      var fraisCPF = 0;
      var effet = "Gagner 10 CPF";
      var message = "Votre préparation garantit une séance fluide !";
      var positionChange = 0;
      var cpfChange = 10;
      var actionSpeciale = "Rédigez un plan de séance pour une formation de 1 heure.";
      break;
    case 13:
      var ccp = "2";
      var intitule = "Gérer le groupe";
      var type = "NC";
      var theme = "Interaction - Gérer le groupe";
      var coutCPF = 0;
      var fraisCPF = 0;
      var effet = "Gagner 5 CPF";
      var message = "Votre gestion du groupe booste la collaboration !";
      var positionChange = 0;
      var cpfChange = 5;
      var actionSpeciale = "";
      break;
    case 14:
      var ccp = "2";
      var intitule = "Varier les modalités";
      var type = "C";
      var theme = "Animation pédagogique";
      var coutCPF = 20;
      var fraisCPF = 0;
      var effet = "Gagner 10 CPF";
      var message = "Vos modalités diversifiées captivent les apprenants !";
      var positionChange = 0;
      var cpfChange = 10;
      var actionSpeciale = "Proposez trois modalités pédagogiques pour une même activité.";
      break;
    case 15:
      var ccp = "2";
      var intitule = "Guilde";
      var type = "G";
      var theme = "Carte malencontreuse";
      var coutCPF = 0;
      var fraisCPF = 0;
      var effet = "Reculer de 10 cases";
      var message = "La Guilde vous ralentit, reculez de 10 cases !";
      var positionChange = Math.max(1, parseInt(joueurCaseID) - 10);
      var cpfChange = 0;
      var actionSpeciale = "";
      break;
    case 16:
      var ccp = "2";
      var intitule = "Gestion des conflits";
      var type = "C";
      var theme = "Animation pédagogique";
      var coutCPF = 20;
      var fraisCPF = 0;
      var effet = "Gagner 10 CPF";
      var message = "Votre médiation apaise les tensions !";
      var positionChange = 0;
      var cpfChange = 10;
      var actionSpeciale = "Simulez la résolution d’un conflit entre deux apprenants.";
      break;
    case 17:
      var ccp = "2";
      var intitule = "Développer l’interactivité";
      var type = "NC";
      var theme = "Animation pédagogique";
      var coutCPF = 0;
      var fraisCPF = 0;
      var effet = "Gagner 5 CPF";
      var message = "L’interactivité renforce vos compétences !";
      var positionChange = 0;
      var cpfChange = 5;
      var actionSpeciale = "";
      break;
    case 18:
      var ccp = "2";
      var intitule = "Évaluation de l’animation";
      var type = "C";
      var theme = "Animation pédagogique";
      var coutCPF = 20;
      var fraisCPF = 0;
      var effet = "Gagner 10 CPF";
      var message = "Votre évaluation améliore vos animations !";
      var positionChange = 0;
      var cpfChange = 10;
      var actionSpeciale = "Concevez un questionnaire pour évaluer une séance d’animation.";
      break;
    case 19:
      var ccp = "-";
      var intitule = "Une Dose d’Innovation";
      var type = "T";
      var theme = "";
      var coutCPF = 0;
      var fraisCPF = 0;
      var effet = "Gagner 40 CPF";
      var message = "Une dose d’énergie, direction l’innovation !";
      var positionChange = 34;
      var cpfChange = 40;
      var actionSpeciale = "";
      break;
    case 20:
      var ccp = "3";
      var intitule = "Diagnostic individuel";
      var type = "C";
      var theme = "Accompagnement des apprenants";
      var coutCPF = 20;
      var fraisCPF = 0;
      var effet = "Gagner 10 CPF";
      var message = "Votre diagnostic oriente l’apprenant avec précision !";
      var positionChange = 0;
      var cpfChange = 10;
      var actionSpeciale = "Réalisez un bilan individuel pour un apprenant fictif.";
      break;
    case 21:
      var ccp = "3";
      var intitule = "Soutien individuel";
      var type = "NC";
      var theme = "Accompagnement des apprenants";
      var coutCPF = 0;
      var fraisCPF = 0;
      var effet = "Gagner 5 CPF";
      var message = "Votre soutien inspire les apprenants !";
      var positionChange = 0;
      var cpfChange = 5;
      var actionSpeciale = "";
      break;
    case 22:
      var ccp = "3";
      var intitule = "Suivre un parcours";
      var type = "C";
      var theme = "Accompagnement des apprenants";
      var coutCPF = 20;
      var fraisCPF = 0;
      var effet = "Gagner 10 CPF";
      var message = "Votre suivi renforce l’engagement !";
      var positionChange = 0;
      var cpfChange = 10;
      var actionSpeciale = "Proposez un plan de suivi pour un apprenant sur 3 mois.";
      break;
    case 23:
      var ccp = "3";
      var intitule = "Motiver un apprenant";
      var type = "J";
      var theme = "Accompagnement des apprenants";
      var coutCPF = 40;
      var fraisCPF = 0;
      var effet = "Avancer de 10 cases";
      var message = "Votre motivation propulse votre progression !";
      var positionChange = parseInt(joueurCaseID) + 10;
      var cpfChange = 0;
      var actionSpeciale = "";
      break;
    case 24:
      var ccp = "3";
      var intitule = "Tutorer à distance";
      var type = "C";
      var theme = "Accompagnement des apprenants";
      var coutCPF = 20;
      var fraisCPF = 0;
      var effet = "Gagner 10 CPF";
      var message = "Votre tutorat à distance est efficace !";
      var positionChange = 0;
      var cpfChange = 10;
      var actionSpeciale = "Rédigez un scénario de tutorat à distance pour un apprenant.";
      break;
    case 25:
      var ccp = "-";
      var intitule = "Baraka";
      var type = "B";
      var theme = "Carte opportunité";
      var coutCPF = 0;
      var fraisCPF = 0;
      var effet = "Gagner 50 CPF";
      var message = "Une chance inattendue booste vos compétences !";
      var positionChange = 0;
      var cpfChange = 50;
      var actionSpeciale = "";
      break;
    case 26:
      var ccp = "3";
      var intitule = "Adapter un parcours";
      var type = "C";
      var theme = "Accompagnement des apprenants";
      var coutCPF = 20;
      var fraisCPF = 0;
      var effet = "Gagner 10 CPF";
      var message = "Votre flexibilité optimise le parcours !";
      var positionChange = 0;
      var cpfChange = 10;
      var actionSpeciale = "Adaptez un parcours pédagogique pour un apprenant avec des contraintes.";
      break;
    case 27:
      var ccp = "3";
      var intitule = "Adapter l’aide";
      var type = "NC";
      var theme = "Accompagnement des apprenants";
      var coutCPF = 0;
      var fraisCPF = 0;
      var effet = "Gagner 5 CPF";
      var message = "Votre adaptation fait la différence !";
      var positionChange = 0;
      var cpfChange = 5;
      var actionSpeciale = "";
      break;
    case 28:
      var ccp = "-";
      var intitule = "Nouvelle Salle";
      var type = "S";
      var theme = "Erreur administrative";
      var coutCPF = 0;
      var fraisCPF = 60;
      var effet = "Payez 60 CPF";
      var message = "Payez 60 CPF !";
      var positionChange = 0;
      var cpfChange = -60;
      var actionSpeciale = "";
      break;
    case 29:
      var ccp = "4";
      var intitule = "Appliquer la réglementation";
      var type = "F";
      var theme = "Pratique professionnelle";
      var coutCPF = 50;
      var fraisCPF = 50;
      var effet = "Payez 50 CPF";
      var message = "La réglementation change en votre défaveur.";
      var positionChange = 0;
      var cpfChange = -50;
      var actionSpeciale = "";
      break;
    case 30:
      var ccp = "4";
      var intitule = "Assurer la qualité";
      var type = "C";
      var theme = "Pratique professionnelle";
      var coutCPF = 20;
      var fraisCPF = 0;
      var effet = "Gagner 10 CPF";
      var message = "Votre démarche qualité est exemplaire !";
      var positionChange = 0;
      var cpfChange = 10;
      var actionSpeciale = "Proposez un plan d’assurance qualité pour une formation.";
      break;
    case 31:
      var ccp = "4";
      var intitule = "Intégrer le RSE";
      var type = "C";
      var theme = "Pratique professionnelle";
      var coutCPF = 20;
      var fraisCPF = 0;
      var effet = "Gagner 10 CPF";
      var message = "Votre approche RSE inspire !";
      var positionChange = 0;
      var cpfChange = 10;
      var actionSpeciale = "Intégrez trois principes RSE dans une formation.";
      break;
    case 32:
      var ccp = "4";
      var intitule = "Analyser les retours";
      var type = "NC";
      var theme = "Pratique professionnelle";
      var coutCPF = 0;
      var fraisCPF = 0;
      var effet = "Gagner 5 CPF";
      var message = "Vos retours affinent vos compétences !";
      var positionChange = 0;
      var cpfChange = 5;
      var actionSpeciale = "";
      break;
    case 33:
      var ccp = "4";
      var intitule = "Amélioration sa pratique";
      var type = "C";
      var theme = "Pratique professionnelle";
      var coutCPF = 20;
      var fraisCPF = 0;
      var effet = "Gagner 10 CPF";
      var message = "Votre amélioration continue impressionne !";
      var positionChange = 0;
      var cpfChange = 10;
      var actionSpeciale = "Identifiez deux axes d’amélioration pour votre pratique.";
      break;
    case 34:
      var ccp = "4";
      var intitule = "Innover en pédagogie";
      var type = "NC";
      var theme = "Pratique professionnelle";
      var coutCPF = 0;
      var fraisCPF = 0;
      var effet = "Gagner 5 CPF";
      var message = "Votre innovation booste vos compétences !";
      var positionChange = 0;
      var cpfChange = 5;
      var actionSpeciale = "";
      break;
    case 35:
      var ccp = "4";
      var intitule = "Réaliser une veille";
      var type = "C";
      var theme = "Pratique professionnelle";
      var coutCPF = 20;
      var fraisCPF = 0;
      var effet = "Gagner 10 CPF";
      var message = "Votre veille enrichit votre pratique !";
      var positionChange = 0;
      var cpfChange = 10;
      var actionSpeciale = "Réalisez une veille sur une tendance pédagogique innovante.";
      break;
    case 36:
      var ccp = "4";
      var intitule = "Guilde";
      var type = "G";
      var theme = "Carte malencontreuse";
      var coutCPF = 0;
      var fraisCPF = 0;
      var effet = "Reculer de 10 cases";
      var message = "La Guilde vous ralentit, reculez de 10 cases !";
      var positionChange = Math.max(1, parseInt(joueurCaseID) - 10);
      var cpfChange = 0;
      var actionSpeciale = "";
      break;
        default:
            caseData = {
                ccp: "",
                intitule: "",
                type: "",
                theme: "",
                coutCPF: 0,
                fraisCPF: 0,
                effet: "",
                message: "",
                positionChange: 0,
                cpfChange: 0,
                actionSpeciale: ""
            };
            break;
    }

    // Appliquer les effets et définir les variables
    setTimeout(() => {
        // Mettre à jour la position si nécessaire
        if (caseData.positionChange !== 0) {
            player.SetVar("varPositionJ" + joueurID, caseData.positionChange);
        }

        // Mettre à jour les CPF si nécessaire
        if (caseData.cpfChange !== 0) {
            let currentCPF = parseInt(player.GetVar("varPointsCompetenceJ" + joueurID) || 0);
            let newCPF = Math.max(0, currentCPF + caseData.cpfChange);
            player.SetVar("varPointsCompetenceJ" + joueurID, newCPF);
        }

        // Définir les variables Storyline
        player.SetVar("varPopJoueurID_J" + joueurID, parseInt(joueurID));
        player.SetVar("varPopCaseID_J" + joueurID, caseID);
        player.SetVar("varPopCaseCCP_J" + joueurID, caseData.ccp);
        player.SetVar("varPopCaseIntitule_J" + joueurID, caseData.intitule);
        player.SetVar("varPopCaseType_J" + joueurID, caseData.type);
        player.SetVar("varPopCaseTheme_J" + joueurID, caseData.theme);
        player.SetVar("varPopCaseCoutCPF_J" + joueurID, caseData.coutCPF);
        player.SetVar("varPopCaseFraisCPF_J" + joueurID, caseData.fraisCPF);
        player.SetVar("varPopCaseEffet_J" + joueurID, caseData.effet);
        player.SetVar("varPopCaseMessage_J" + joueurID, caseData.message);
        player.SetVar("varPopCaseActionSpeciale_J" + joueurID, caseData.actionSpeciale);

        // Réinitialiser varProcessing_JX et varLastCaseID_JX
        player.SetVar("varProcessing_J" + joueurID, false);
        player.SetVar("varLastCaseID_J" + joueurID, 0);
    }, 200); // Réduit à 200 ms pour une exécution plus rapide
}

window.popupCase = popupCase;
}

window.Script3 = function()
{
  // Récupérer l'élément progressBar
const progressBarDyn = object('5rw03420tra');

let maxBar = 1920;
let currentBar = 0;
let progressBar;
let intervalId;

let initialisation = function() {
  progressBar = progressBarDyn;
  progressBar.value = currentBar;
  progressBar.max = maxBar;
}

let displayBar = function() {
  currentBar++;
  if (currentBar > maxBar) {
    clearInterval( intervalId );
  }
  progressBar.value = currentBar;
}

window.onload = function() {
  initialisation();
  intervalId = setInterval( displayBar , 100 );
}
}

window.Script4 = function()
{
  // Variable globale pour stocker l'ID de l'intervalle
var intervalId = null;

function chrono() {
    //console.log("Fonction chrono() appelée à : ", new Date());

    // Vérifier si GetPlayer est disponible
    if (typeof GetPlayer === "undefined") {
        //console.error("GetPlayer n'est pas défini. Exécutez le script dans Storyline (prévisualisation/publication).");
        return;
    }

    // Récupérer l'objet player de Storyline
    var player = GetPlayer();
    //console.log("Player récupéré : ", player);

    // Vérifier si les variables Storyline existent
    var minutesTotales = player.GetVar("varChronoNombre");
    //console.log("Valeur de varChronoNombre : ", minutesTotales);

    // Arrêter tout intervalle existant
    if (intervalId !== null) {
        clearInterval(intervalId);
        //console.log("Intervalle précédent arrêté. ID : ", intervalId);
    }

    // Vérifier si le compte à rebours est valide
    if (minutesTotales === null || minutesTotales === undefined || minutesTotales <= 0) {
        player.SetVar("varChronoTxt", "00:00:00");
        player.SetVar("varChronoNombre", 0);
        //console.error("Compte à rebours non démarré. Raison : varChronoNombre invalide ou <= 0 : ", minutesTotales);
        return;
    }

    // Fonction pour formater le temps en HH:MM:SS
    function formaterTemps(minutesTotales) {
        var heures = Math.floor(minutesTotales / 60);
        var minutesRestantes = minutesTotales % 60;
        var minutes = Math.floor(minutesRestantes);
        var secondes = Math.round((minutesRestantes - minutes) * 60);

        // Formater avec des zéros
        var heuresFormatees = heures < 10 ? "0" + heures : heures;
        var minutesFormatees = minutes < 10 ? "0" + minutes : minutes;
        var secondesFormatees = secondes < 10 ? "0" + secondes : secondes;

        return heuresFormatees + ":" + minutesFormatees + ":" + secondesFormatees;
    }

    // Mettre à jour le chronomètre immédiatement
    var chronoFormate = formaterTemps(minutesTotales);
    player.SetVar("varChronoTxt", chronoFormate);
    //console.log("Chrono initial : ", chronoFormate, "Minutes initiales : ", minutesTotales);

    // Lancer le compte à rebours
    intervalId = setInterval(function() {
        // Relire varChronoNombre pour détecter les modifications
        minutesTotales = player.GetVar("varChronoNombre") || 0;
        //console.log("Intervalle exécuté. Minutes restantes : ", minutesTotales);

        // Vérifier si le temps est écoulé ou invalide
        if (minutesTotales <= 0) {
            clearInterval(intervalId);
            intervalId = null;
            player.SetVar("varChronoTxt", "00:00:00");
            player.SetVar("varChronoNombre", 0);
            //console.log("Compte à rebours terminé !");
            // Optionnel : Déclencher une action Storyline
            player.SetVar("varCompteFini", true);
            return;
        }

        // Décrémenter le temps (1 seconde = 1/60 minutes)
        minutesTotales -= 1 / 60;

        // Mettre à jour varChronoNombre
        player.SetVar("varChronoNombre", minutesTotales);

        // Formater et mettre à jour varChronoTxt
        chronoFormate = formaterTemps(minutesTotales);
        player.SetVar("varChronoTxt", chronoFormate);
        //console.log("Chrono mis à jour : ", chronoFormate);

    }, 1000); // Mettre à jour toutes les 1000ms (1 seconde)
    //console.log("Nouvel intervalle démarré. ID : ", intervalId);
}

// Log pour indiquer que le script est chargé
//console.log("Script chargé. En attente d'appel de chrono().");

chrono();
}

window.Script5 = function()
{
  let joueur = 1;
let pion = "6kUlsrqaalw";

positionJoueur(joueur,pion);

let joueurCaseID = getVar('varPositionJ1');

popupCase(joueur, joueurCaseID);

}

window.Script6 = function()
{
  let joueur = 2;
let pion = "5XmZi3JYfRD";

positionJoueur(joueur,pion);

let joueurCaseID = getVar('varPositionJ2');

popupCase(joueur, joueurCaseID);

}

window.Script7 = function()
{
  let joueur = 3;
let pion = "5wAHlhWp5vh";

positionJoueur(joueur,pion);

let joueurCaseID = getVar('varPositionJ3');

popupCase(joueur, joueurCaseID);
}

window.Script8 = function()
{
  let joueur = 4;
let pion = "6WSQWcgPjLS";

positionJoueur(joueur,pion);

let joueurCaseID = getVar('varPositionJ4');

popupCase(joueur, joueurCaseID);
}

window.Script9 = function()
{
  var player = GetPlayer();

var modeJeu = player.GetVar("varModeJeu");
var tour = player.GetVar("varTourJoueur");
var joueurActifID = "";

// Déterminer le joueur actif en fonction du tour actuel
if (modeJeu == "solo") {
    joueurActifID = "J1";
} else if (modeJeu == "multi") {
    var nbJoueurs = player.GetVar("varNombreJoueurs");
    var idJoueur = player.GetVar("varPionJ1");
    joueurActifID = "J" + tour;    
}

var position = 0;
var points = 0;
var tours = 0;
var modulesCertifies = 0; // Ajout pour le nombre de modules certifiés
var leconsAjoutees = 0;   // Ajout pour le nombre total de leçons ajoutées
if (joueurActifID == "J1") {
    position = player.GetVar("varPositionJ1");
    points = player.GetVar("varPointsCompetenceJ1");
    tours = player.GetVar("varToursJ1");
    modulesCertifies = player.GetVar("varModulesCertifiesJ1");
    leconsAjoutees = player.GetVar("varLeconsAjouteesJ1");
} else if (joueurActifID == "J2") {
    position = player.GetVar("varPositionJ2");
    points = player.GetVar("varPointsCompetenceJ2");
    tours = player.GetVar("varToursJ2");
    modulesCertifies = player.GetVar("varModulesCertifiesJ2");
    leconsAjoutees = player.GetVar("varLeconsAjouteesJ2");
} else if (joueurActifID == "J3") {
    position = player.GetVar("varPositionJ3");
    points = player.GetVar("varPointsCompetenceJ3");
    tours = player.GetVar("varToursJ3");
    modulesCertifies = player.GetVar("varModulesCertifiesJ3");
    leconsAjoutees = player.GetVar("varLeconsAjouteesJ3");
} else if (joueurActifID == "J4") {
    position = player.GetVar("varPositionJ4");
    points = player.GetVar("varPointsCompetenceJ4");
    tours = player.GetVar("varToursJ4");
    modulesCertifies = player.GetVar("varModulesCertifiesJ4");
    leconsAjoutees = player.GetVar("varLeconsAjouteesJ4");
}

var varDeAleatoire = Math.floor(Math.random() * 11) + 2;
player.SetVar("varDe", varDeAleatoire);

// Vérifier si le joueur passe par la Case 1 (Départ) pendant son déplacement
var positionAvant = position;
position += varDeAleatoire;

// Gérer le passage ou l'atteinte de la Case 1 (Départ)
if (position >= 36) {
    points += 40; // Bonus de passage par la Case 1
    tours += 1; // Incrémenter le nombre de tours
    position = position % 36;
    if (position == 0) {
        position = 36;
    }
} else if (positionAvant < 1 && position >= 1) {
    points += 40;
    tours += 1;
}

if (joueurActifID == "J1") {
    player.SetVar("varPositionJ1", position);
    player.SetVar("varPointsCompetenceJ1", points);
    player.SetVar("varToursJ1", tours);
    player.SetVar("varModulesCertifiesJ1", modulesCertifies);
    player.SetVar("varLeconsAjouteesJ1", leconsAjoutees);
} else if (joueurActifID == "J2") {
    player.SetVar("varPositionJ2", position);
    player.SetVar("varPointsCompetenceJ2", points);
    player.SetVar("varToursJ2", tours);
    player.SetVar("varModulesCertifiesJ2", modulesCertifies);
    player.SetVar("varLeconsAjouteesJ2", leconsAjoutees);
} else if (joueurActifID == "J3") {
    player.SetVar("varPositionJ3", position);
    player.SetVar("varPointsCompetenceJ3", points);
    player.SetVar("varToursJ3", tours);
    player.SetVar("varModulesCertifiesJ3", modulesCertifies);
    player.SetVar("varLeconsAjouteesJ3", leconsAjoutees);
} else if (joueurActifID == "J4") {
    player.SetVar("varPositionJ4", position);
    player.SetVar("varPointsCompetenceJ4", points);
    player.SetVar("varToursJ4", tours);
    player.SetVar("varModulesCertifiesJ4", modulesCertifies);
    player.SetVar("varLeconsAjouteesJ4", leconsAjoutees);
}

// Incrémenter le tour pour le prochain joueur (après avoir mis à jour les variables)
if (modeJeu == "multi") {
    var nbJoueurs = player.GetVar("varNombreJoueurs");
    tour = (tour % nbJoueurs) + 1;
    player.SetVar("varTourJoueur", tour);
}

// Vérifier la fin du jeu en mode solo
if (modeJeu == "solo" && joueurActifID == "J1" && tours >= 3) {
    // Fin du jeu en mode solo
    // Ajoute ici l'action pour arrêter le jeu (ex. : afficher un calque de fin, arrêter le jeu, etc.)
    // Par exemple : player.ShowLayer("calqueFinJeu");
}
}

window.Script10 = function()
{
  var player = GetPlayer();

// Récupérer les valeurs des variables Storyline
let pseudo1 = player.GetVar("varNomJ1");

// Filtrer critere1 pour varNomJ1
if (pseudo1 != null) {
    var filteredText1 = pseudo1
        .replace(/[\r\n\t\x00-\x1F\x7F]/g, "") // Supprime retours chariot, tabulations, caractères de contrôle
        .normalize("NFD") // Décompose les accents (par exemple, é -> e + accent)
        .replace(/[\u0300-\u036F]/g, "") // Supprime les marques d'accent
        .replace(/[^a-zA-Z0-9]/g, "") // Garde uniquement alphanumériques
        .substring(0, 20); // Limite à 20 caractères
    player.SetVar("varNomJ1", filteredText1);
} else {
    // console.log("varNomJ1 - critere1 est null, pas de mise à jour");
}
}

window.Script11 = function()
{
  var player = GetPlayer();

// Récupérer les valeurs des variables Storyline
let pseudo1 = player.GetVar("varNomJ1");

// Filtrer critere1 pour varNomJ1
if (pseudo1 != null) {
    var filteredText1 = pseudo1
        .replace(/[\r\n\t\x00-\x1F\x7F]/g, "") // Supprime retours chariot, tabulations, caractères de contrôle
        .normalize("NFD") // Décompose les accents (par exemple, é -> e + accent)
        .replace(/[\u0300-\u036F]/g, "") // Supprime les marques d'accent
        .replace(/[^a-zA-Z0-9]/g, "") // Garde uniquement alphanumériques
        .substring(0, 20); // Limite à 20 caractères
    player.SetVar("varNomJ1", filteredText1);
} else {
    // console.log("varNomJ1 - critere1 est null, pas de mise à jour");
}
}

window.Script12 = function()
{
  var player = GetPlayer();

// Récupérer les valeurs des variables Storyline
let pseudo2 = player.GetVar("varNomJ2");

// Filtrer critere2 pour varNomJ2
if (pseudo2 != null) {
    var filteredText2 = pseudo2
        .replace(/[\r\n\t\x00-\x1F\x7F]/g, "") // Supprime retours chariot, tabulations, caractères de contrôle
        .normalize("NFD") // Décompose les accents (par exemple, é -> e + accent)
        .replace(/[\u0300-\u036F]/g, "") // Supprime les marques d'accent
        .replace(/[^a-zA-Z0-9]/g, "") // Garde uniquement alphanumériques
        .substring(0, 20); // Limite à 20 caractères
    player.SetVar("varNomJ2", filteredText2);
} else {
    // console.log("varNomJ2 - critere1 est null, pas de mise à jour");
}
}

window.Script13 = function()
{
  var player = GetPlayer();

// Récupérer les valeurs des variables Storyline
let pseudo1 = player.GetVar("varNomJ1");

// Filtrer critere1 pour varNomJ1
if (pseudo1 != null) {
    var filteredText1 = pseudo1
        .replace(/[\r\n\t\x00-\x1F\x7F]/g, "") // Supprime retours chariot, tabulations, caractères de contrôle
        .normalize("NFD") // Décompose les accents (par exemple, é -> e + accent)
        .replace(/[\u0300-\u036F]/g, "") // Supprime les marques d'accent
        .replace(/[^a-zA-Z0-9]/g, "") // Garde uniquement alphanumériques
        .substring(0, 20); // Limite à 20 caractères
    player.SetVar("varNomJ1", filteredText1);
} else {
    // console.log("varNomJ1 - critere1 est null, pas de mise à jour");
}
}

window.Script14 = function()
{
  var player = GetPlayer();

// Récupérer les valeurs des variables Storyline
let pseudo2 = player.GetVar("varNomJ2");

// Filtrer critere2 pour varNomJ2
if (pseudo2 != null) {
    var filteredText2 = pseudo2
        .replace(/[\r\n\t\x00-\x1F\x7F]/g, "") // Supprime retours chariot, tabulations, caractères de contrôle
        .normalize("NFD") // Décompose les accents (par exemple, é -> e + accent)
        .replace(/[\u0300-\u036F]/g, "") // Supprime les marques d'accent
        .replace(/[^a-zA-Z0-9]/g, "") // Garde uniquement alphanumériques
        .substring(0, 20); // Limite à 20 caractères
    player.SetVar("varNomJ2", filteredText2);
} else {
    // console.log("varNomJ2 - critere1 est null, pas de mise à jour");
}
}

window.Script15 = function()
{
  var player = GetPlayer();

// Récupérer les valeurs des variables Storyline
let pseudo3 = player.GetVar("varNomJ3");

// Filtrer critere3 pour varNomJ3
if (pseudo3 != null) {
    var filteredText3 = pseudo3
        .replace(/[\r\n\t\x00-\x1F\x7F]/g, "") // Supprime retours chariot, tabulations, caractères de contrôle
        .normalize("NFD") // Décompose les accents (par exemple, é -> e + accent)
        .replace(/[\u0300-\u036F]/g, "") // Supprime les marques d'accent
        .replace(/[^a-zA-Z0-9]/g, "") // Garde uniquement alphanumériques
        .substring(0, 20); // Limite à 20 caractères
    player.SetVar("varNomJ3", filteredText3);
} else {
    // console.log("varNomJ3 - critere1 est null, pas de mise à jour");
}
}

window.Script16 = function()
{
  var player = GetPlayer();

// Récupérer les valeurs des variables Storyline
let pseudo4 = player.GetVar("varNomJ4");

// Filtrer critere3 pour varNomJ3
if (pseudo4 != null) {
    var filteredText4 = pseudo4
        .replace(/[\r\n\t\x00-\x1F\x7F]/g, "") // Supprime retours chariot, tabulations, caractères de contrôle
        .normalize("NFD") // Décompose les accents (par exemple, é -> e + accent)
        .replace(/[\u0300-\u036F]/g, "") // Supprime les marques d'accent
        .replace(/[^a-zA-Z0-9]/g, "") // Garde uniquement alphanumériques
        .substring(0, 20); // Limite à 20 caractères
    player.SetVar("varNomJ4", filteredText4);
} else {
    // console.log("varNomJ4 - critere1 est null, pas de mise à jour");
}
}

window.Script17 = function()
{
  var player = GetPlayer();

// Récupérer les valeurs des variables Storyline
let pseudo1 = player.GetVar("varNomJ1");

// Filtrer critere1 pour varNomJ1
if (pseudo1 != null) {
    var filteredText1 = pseudo1
        .replace(/[\r\n\t\x00-\x1F\x7F]/g, "") // Supprime retours chariot, tabulations, caractères de contrôle
        .normalize("NFD") // Décompose les accents (par exemple, é -> e + accent)
        .replace(/[\u0300-\u036F]/g, "") // Supprime les marques d'accent
        .replace(/[^a-zA-Z0-9]/g, "") // Garde uniquement alphanumériques
        .substring(0, 20); // Limite à 20 caractères
    player.SetVar("varNomJ1", filteredText1);
} else {
    // console.log("varNomJ1 - critere1 est null, pas de mise à jour");
}
}

window.Script18 = function()
{
  var player = GetPlayer();

// Récupérer les valeurs des variables Storyline
let pseudo2 = player.GetVar("varNomJ2");

// Filtrer critere2 pour varNomJ2
if (pseudo2 != null) {
    var filteredText2 = pseudo2
        .replace(/[\r\n\t\x00-\x1F\x7F]/g, "") // Supprime retours chariot, tabulations, caractères de contrôle
        .normalize("NFD") // Décompose les accents (par exemple, é -> e + accent)
        .replace(/[\u0300-\u036F]/g, "") // Supprime les marques d'accent
        .replace(/[^a-zA-Z0-9]/g, "") // Garde uniquement alphanumériques
        .substring(0, 20); // Limite à 20 caractères
    player.SetVar("varNomJ2", filteredText2);
} else {
    // console.log("varNomJ2 - critere1 est null, pas de mise à jour");
}
}

window.Script19 = function()
{
  var player = GetPlayer();

// Récupérer les valeurs des variables Storyline
let pseudo3 = player.GetVar("varNomJ3");

// Filtrer critere3 pour varNomJ3
if (pseudo3 != null) {
    var filteredText3 = pseudo3
        .replace(/[\r\n\t\x00-\x1F\x7F]/g, "") // Supprime retours chariot, tabulations, caractères de contrôle
        .normalize("NFD") // Décompose les accents (par exemple, é -> e + accent)
        .replace(/[\u0300-\u036F]/g, "") // Supprime les marques d'accent
        .replace(/[^a-zA-Z0-9]/g, "") // Garde uniquement alphanumériques
        .substring(0, 20); // Limite à 20 caractères
    player.SetVar("varNomJ3", filteredText3);
} else {
    // console.log("varNomJ3 - critere1 est null, pas de mise à jour");
}
}

};
