
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

export default function PlayerCard() {
	return (
		<div className="text-sm p-15 w-11/12 font-serif">
			<h2 className="text-2xl font-bold mb-4 text-amber-800">Fiche Joueur</h2>
			<div className="grid gap-6">
                <div className="flex w-full justify-between">
                    <NameText />
                	<RaceSelect />
                </div>
                <div className="flex w-full justify-between">
                    <ClassSelect />
                    <LanguageSelect />
                    <LevelProgress />
                </div>
                <div className="flex w-full justify-between">
                <AbilityScore />
                <SkillSelect />
                </div>
                <SpellListSelect />
				<EquipmentList />
				<HistoryEditor />
				<div className="flex w-full justify-end">
                    <button className="bg-blue-500 text-white rounded px-4 py-2">Enregistrer</button>
                </div>
			</div>
		</div>
	);
}
