/* initialisation des paramètres du jeu */
var jeu = [[0,0,0],[0,0,0],[0,0,0]];
var joueur = 7
var points = [0, 0];
var usernames = [];

/* fonction qui affiche l'état du tableau en lignes et en colonnes */
function affiche_jeu()
{
	let chaine = jeu.map(j => j.join(" ")).join("\n");
	alert(chaine);
}
function restart() {
	jeu = [[0,0,0],[0,0,0],[0,0,0]];
	document.querySelectorAll("td").forEach(e => {
		e.className = "";
		Array.from(e.children).forEach(c => c.style.display = "none")
	})
}
const sleep = (timeout) => {
	return new Promise((res, rej) => setTimeout(res, timeout));
};

/* COMPLETER LE CODE JAVASCRIPT ICI ! */



/* fonctions pour déterminer s'il y a un gagnant */
/**
 * @param {number} lineIndex 
 * @param {number} columnIndex
 */
async function updatePoints() {
	let pointElements = Array.from(document.getElementsByClassName("points"));
	let crownElement = Array.from(document.getElementsByClassName("crown"));
	pointElements.forEach((element, i) => {
		element.innerHTML = `Points: ${points[i]}`
		if(points[0] > points[1]) {
			crownElement[0].style.display = "block";
			crownElement[1].style.display = "none";
		} else if(points[1] > points[0]) {
			crownElement[0].style.display = "none";
			crownElement[1].style.display = "block";
		} else if(points[0] == points[1]) {
			crownElement[0].style.display = "none";
			crownElement[1].style.display = "none";
		};
	});
}
function updateUsernames() {
	Array.from(document.getElementsByClassName("username"))
		.forEach((element, i) => {
			let username = prompt(`Nom du ${i+1}e joueur:`);
			element.innerHTML = username;
			usernames.push(username);
		});
};
function isFull() {
	return !jeu.map(j => j.join(" ")).join(" ").split(" ").includes("0");
}
function somme_ligne(i)
{
	som = 0;
	for (var j=0; j<jeu[i].length; j++)
	{
		som = som + jeu[i][j];
	}
	return som;
}
function somme_colonne(j)
{
	som = 0;
	for (var i=0; i<jeu.length; i++)
	{
		som = som + jeu[i][j];
	}
	return som;				
}
function somme_diag()
{
	som = 0;
	for (var i=0; i<jeu.length; i++)
	{
		som = som + jeu[i][i];
	}
	return som;						
}
function somme_anti_diag()
{
	som = 0;
	for (var i=0; i<jeu.length; i++)
	{
		som = som + jeu[i][2-i];
	}
	return som;						
}

updateUsernames();

document.querySelectorAll("td").forEach(element => {
	element.addEventListener("click", async () => {
		if(element.className.includes("taken")) return;
		let child = Array.from(element.children).find(e => e.tagName.toLowerCase() == "i" && e.className.includes(joueur == 7 ? "cross" : "circle"));
		child.style.display = "block"
		element.className += " taken"
		let position = child.id.split("");
		jeu[position[0]][position[1]] = joueur;
		
		if(
			somme_ligne(position[0]) == joueur*3
			|| somme_colonne(position[1]) == joueur*3
			|| somme_diag() == joueur*3
			|| somme_anti_diag() == joueur*3
		){
			let message = document.getElementById("winMessage");
			message.innerHTML = usernames[joueur-7] + " remporte ce round !";
			message.style.display = "block";
			await sleep(150);
			message.style.opacity = 1;
			await sleep(1000);
			message.style.opacity = 0;
			await sleep(150);
			message.style.display = "none";


			points[joueur-7]++
			updatePoints();
			restart();
		}
		if(isFull()) {
			let message = document.getElementById("winMessage");
			message.innerHTML = "Egalité !";
			message.style.display = "block";
			await sleep(150);
			message.style.opacity = 1;
			await sleep(1000);
			message.style.opacity = 0;
			await sleep(150);
			message.style.display = "none";
		}
		joueur = joueur == 7 ? 8 : 7
	});
});