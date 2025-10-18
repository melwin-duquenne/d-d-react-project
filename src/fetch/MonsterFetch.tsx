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


export async function fetchAllClasses() {
	const res = await fetch("https://www.dnd5eapi.co/api/classes");
	if (!res.ok) throw new Error("Erreur lors du fetch des classes");
	const data = await res.json();
	return data.results;
}

export async function fetchAllLanguages() {
	const res = await fetch("https://www.dnd5eapi.co/api/languages");
	if (!res.ok) throw new Error("Erreur lors du fetch des langues");
	const data = await res.json();
	return data.results;
}

export async function fetchAllSkills() {
	const res = await fetch("https://www.dnd5eapi.co/api/skills");
	if (!res.ok) throw new Error("Erreur lors du fetch des compétences");
	const data = await res.json();
	return data.results;
}

export async function fetchAllSpells() {
	const res = await fetch("https://www.dnd5eapi.co/api/spells");
	if (!res.ok) throw new Error("Erreur lors du fetch des sorts");
	const data = await res.json();
	return data.results;
}

export async function fetchAllMagicItems() {
	const res = await fetch("https://www.dnd5eapi.co/api/magic-items");
	if (!res.ok) throw new Error("Erreur lors du fetch des objets magiques");
	const data = await res.json();
	return data.results;
}

export async function fetchAllEquipment() {
	const res = await fetch("https://www.dnd5eapi.co/api/equipment");
	if (!res.ok) throw new Error("Erreur lors du fetch des équipements");
	const data = await res.json();
	return data.results;
}
