import { useEffect, useState } from "react";
import { fetchMonsterDetails } from "@/fetch/MonsterFetch";
import Image from "next/image";

export default function MonsterModal({ index, onClose }: { index: string; onClose: () => void }) {
  const [monster, setMonster] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMonsterDetails(index)
      .then(data => setMonster(data))
      .catch(() => setError("Erreur lors du chargement de la fiche."))
      .finally(() => setLoading(false));
  }, [index]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-3/4 w-full relative">
        <button className="absolute top-2 right-2 text-amber-700 text-2xl" onClick={onClose}>&times;</button>
        {loading ? (
          <div>Chargement...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : monster ? (
          <div>
             <Image src={"https://www.dnd5eapi.co/api/images/monsters/adult-black-dragon.png"} alt={monster.name} width={250} height={250} className="mb-4 opacity-190" />
            <div className="text-2xl font-bold mb-4 text-amber-800">{monster.name}</div>
            <div className="mb-2 text-xl">Niveau de difficulté : {monster.challenge_rating}</div>
            <div className="flex">
                <div>
                    
                    <div className="mb-2">Type : {monster.type}</div>
                    <div className="mb-2">Taille : {monster.size}</div>
                    <div className="mb-2">Alignement : {monster.alignment}</div>
                    <div className="mb-2">Langues : {monster.languages}</div>
                    <div className="mb-2">Classe d'armure : {
                    Array.isArray(monster.armor_class)
                        ? monster.armor_class.map((ac: any, i: number) => (
                            <span key={i}>{ac.type} ({ac.value}){i < monster.armor_class.length - 1 ? ', ' : ''}</span>
                        ))
                        : monster.armor_class
                    }</div>
                    <div className="mb-2">Points de vie : {monster.hit_points} <span className="text-xs">({monster.hit_points_roll})</span></div>
                    <div className="mb-2">Vitesse : {
                    monster.speed && typeof monster.speed === 'object'
                        ? Object.entries(monster.speed).map(([k, v]) => `${k}: ${v}`).join(', ')
                        : monster.speed
                    }</div>
                </div>
                <div>
                    <div className="mb-2">Force : {monster.strength}</div>
                    <div className="mb-2">Dextérité : {monster.dexterity}</div>
                    <div className="mb-2">Constitution : {monster.constitution}</div>
                    <div className="mb-2">Intelligence : {monster.intelligence}</div>
                    <div className="mb-2">Sagesse : {monster.wisdom}</div>
                    <div className="mb-2">Charisme : {monster.charisma}</div>
                    <div className="mb-2">XP : {monster.xp}</div>
                    <div className="mb-2">Sens : {
                    monster.senses && typeof monster.senses === 'object'
                        ? Object.entries(monster.senses).map(([k, v]) => `${k}: ${v}`).join(', ')
                        : monster.senses
                    }</div>
                    {monster.damage_immunities && monster.damage_immunities.length > 0 && (
                    <div className="mb-2">Immunités aux dégâts : {monster.damage_immunities.join(', ')}</div>
                    )}
                    {monster.damage_resistances && monster.damage_resistances.length > 0 && (
                    <div className="mb-2">Résistances aux dégâts : {monster.damage_resistances.join(', ')}</div>
                    )}
                    {monster.damage_vulnerabilities && monster.damage_vulnerabilities.length > 0 && (
                    <div className="mb-2">Vulnérabilités aux dégâts : {monster.damage_vulnerabilities.join(', ')}</div>
                    )}
                    {monster.condition_immunities && monster.condition_immunities.length > 0 && (
                    <div className="mb-2">Immunités aux conditions : {monster.condition_immunities.map((ci: any) => ci.name || ci).join(', ')}</div>
                    )}
                    </div>
            </div>
                    {monster.proficiencies && monster.proficiencies.length > 0 && (
                    <div className="mb-2">
                        <b>Compétences :</b>
                        <ul className="list-disc ml-4">
                        {monster.proficiencies.map((p: any, i: number) => (
                            <li key={i}>{p.proficiency?.name || p.proficiency} (+{p.value})</li>
                        ))}
                        </ul>
                    </div>
                    )}
                
            {monster.special_abilities && monster.special_abilities.length > 0 && (
              <div className="mb-2">
                <b>Capacités spéciales :</b>
                <ul className="list-disc ml-4">
                  {monster.special_abilities.map((a: any, i: number) => (
                    <li key={i}><b>{a.name} :</b> {a.desc}</li>
                  ))}
                </ul>
              </div>
            )}
            {monster.actions && monster.actions.length > 0 && (
              <div className="mb-2">
                <b>Actions :</b>
                <ul className="list-disc ml-4">
                  {monster.actions.map((a: any, i: number) => (
                    <li key={i}>
                      <b>{a.name} :</b> {a.desc}
                      {a.damage && a.damage.length > 0 && (
                        <span> <b>Dégâts :</b> {a.damage.map((d: any, j: number) => `${d.damage_type?.name || d.damage_type}: ${d.damage_dice}`).join(', ')}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {monster.legendary_actions && monster.legendary_actions.length > 0 && (
              <div className="mb-2">
                <b>Actions légendaires :</b>
                <ul className="list-disc ml-4">
                  {monster.legendary_actions.map((a: any, i: number) => (
                    <li key={i}>
                      <b>{a.name} :</b> {a.desc}
                      {a.damage && a.damage.length > 0 && (
                        <span> <b>Dégâts :</b> {a.damage.map((d: any, j: number) => `${d.damage_type?.name || d.damage_type}: ${d.damage_dice}`).join(', ')}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
