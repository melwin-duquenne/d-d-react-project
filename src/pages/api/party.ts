import type { NextApiRequest, NextApiResponse } from "next";
import { createParty, getPartiesByMaster, getPartyById, updateAdventureText } from "@/model/partyModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Créer une nouvelle partie
    const { name, masterEmail } = req.body;
    if (!name || !masterEmail) return res.status(400).json({ error: "Nom et email requis" });
    const id = await createParty(name, masterEmail);
    return res.status(201).json({ success: true, id });
  }

  if (req.method === "GET") {
    // Lister les parties d'un master
    const { masterEmail } = req.query;
    if (!masterEmail || typeof masterEmail !== "string") return res.status(400).json({ error: "Email requis" });
    const parties = await getPartiesByMaster(masterEmail);
    return res.status(200).json({ success: true, parties });
  }

  if (req.method === "PUT") {
    // Récupérer une partie par son id
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "ID requis" });
    const party = await getPartyById(id);
    if (!party) return res.status(404).json({ error: "Partie non trouvée" });
    return res.status(200).json({ success: true, party });
  }

  if (req.method === "PATCH") {
    // Mettre à jour le texte d'aventure d'une partie
    const { partyId, adventureText } = req.body;
    if (!partyId) return res.status(400).json({ error: "ID requis" });
    await updateAdventureText(partyId, adventureText ?? "");
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Méthode non autorisée" });
}
