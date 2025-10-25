

import { useState } from "react";
import AbilityScore from "./player/AbilityScore";
import ClassSelect from "./player/ClassSelect";
import EquipmentList from "./player/EquipmentList";
import HistoryEditor from "./player/HistoryEditor";
import LanguageSelect from "./player/LanguageSelect";
import LevelProgress from "./player/LevelProgress";
import NameText from "./player/NameText";
import RaceSelect from "./player/RaceSelect";
import SkillSelect from "./player/SkillSelect";
import SpellListSelect from "./player/SpellListSelect";


import { PlayerCardData } from "@/model/playerCardTemplate";

interface PlayerCardProps {
  initialData?: PlayerCardData;
  onClose?: () => void;
}

export default function PlayerCard({ initialData, onClose }: PlayerCardProps) {
    // State centralisé pour la fiche joueur (exemple minimal)
    const [player, setPlayer] = useState<PlayerCardData>(
        initialData ?? {
            name: "",
            race: "",
            class: "",
            level: 1,
            xp: 0,
            abilityScores: {
                strength: 10,
                dexterity: 10,
                constitution: 10,
                intelligence: 10,
                wisdom: 10,
                charisma: 10,
            },
            languages: [],
            skills: [],
            spells: [],
            equipment: [],
            magicItems: [],
            history: "",
        }
    );

    // TODO: Passer des setters aux sous-composants pour mettre à jour le state

    const handleSave = async () => {
        try {
            const method = initialData ? "PUT" : "POST";
            const res = await fetch("/api/playerCard", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(player),
            });
            if (!res.ok) throw new Error("Erreur lors de l'enregistrement");
            alert("Fiche joueur enregistrée !");
            if (onClose) onClose();
        } catch (e) {
            alert("Erreur lors de l'enregistrement");
        }
    };

    return (
        <div className="text-sm p-15 w-11/12 font-serif">
            <h2 className="text-2xl font-bold mb-4 text-amber-800">Fiche Joueur</h2>
            <div className="grid gap-6">
                <div className="flex w-full justify-between">
                    <NameText
                        value={player.name}
                        onChange={name => setPlayer({ ...player, name })}
                    />
                    <RaceSelect
                        value={player.race}
                        onChange={race => setPlayer({ ...player, race })}
                    />
                </div>
                <div className="flex w-full justify-between">
                    <ClassSelect
                        value={player.class}
                        onChange={classValue => setPlayer({ ...player, class: classValue })}
                    />
                    <LanguageSelect
                        value={player.languages}
                        onChange={languages => setPlayer({ ...player, languages })}
                    />
                    <LevelProgress
                        level={player.level}
                        xp={player.xp}
                        onChangeLevel={level => setPlayer({ ...player, level })}
                        onChangeXp={xp => setPlayer({ ...player, xp })}
                    />
                </div>
                <div className="flex w-full justify-between">
                    <AbilityScore
                        value={player.abilityScores}
                        onChange={abilityScores => setPlayer({ ...player, abilityScores })}
                    />
                    <SkillSelect
                        value={player.skills}
                        onChange={skills => setPlayer({ ...player, skills })}
                    />
                </div>
                <SpellListSelect
                    value={player.spells}
                    onChange={spells => setPlayer({ ...player, spells })}
                />
                <EquipmentList
                    value={player.equipment}
                    magicValue={player.magicItems}
                    onChange={(equipment, magicItems) => setPlayer({ ...player, equipment, magicItems })}
                />
                <HistoryEditor
                    value={player.history}
                    onChange={history => setPlayer({ ...player, history })}
                />
                <div className="flex w-full justify-end gap-2">
                    {onClose && (
                        <button className="bg-gray-400 text-white rounded px-4 py-2" onClick={onClose}>
                            Annuler
                        </button>
                    )}
                    <button className="bg-blue-500 text-white rounded px-4 py-2" onClick={handleSave}>
                        Enregistrer
                    </button>
                </div>
            </div>
        </div>
    );
}
