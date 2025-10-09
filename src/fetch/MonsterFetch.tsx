'use server';

export async function fetchMonsterDetails(index: string) {
	const res = await fetch(`https://www.dnd5eapi.co/api/monsters/${index}`);
	if (!res.ok) throw new Error("Erreur lors du fetch du monstre");
	return await res.json();
}
export async function fetchAllMonsters() {
	const res = await fetch("https://www.dnd5eapi.co/api/monsters");
	if (!res.ok) throw new Error("Erreur lors du fetch des monstres");
	const data = await res.json();
	return data.results;
}

export async function fetchAllRaces() {
	const res = await fetch("https://www.dnd5eapi.co/api/races");
	if (!res.ok) throw new Error("Erreur lors du fetch des races");
	const data = await res.json();
	return data.results;
}
