
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
		<div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full mx-auto">
			<h2 className="text-2xl font-bold mb-4 text-amber-800">Fiche Joueur</h2>
			<div className="grid gap-6">
                <div className="flex w-full">
                    <NameText />
                	<RaceSelect />
                </div>
                <div className="flex w-full">
                    <ClassSelect />
                    <LevelProgress />
                    <LanguageSelect />
                </div>
                <div className="flex w-full">
                <AbilityScore />
                <SkillSelect />
                </div>
                <SpellListSelect />
				<EquipmentList />
				<HistoryEditor />
				
				
			</div>
		</div>
	);
}
