import { useEffect, useState } from "react";
import { fetchMonsterDetails } from "@/fetch/MonsterFetch";
import Image from "next/image";
import { MonsterDetails } from "@/model/monster";
export default function MonsterModal({ index, onClose }: { index: string; onClose: () => void }) {
  const [monster, setMonster] = useState<MonsterDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMonsterDetails(index)
      .then(data => setMonster(data))
      .catch(() => setError("Erreur lors du chargement de la fiche."))
      .finally(() => setLoading(false));
  }, [index]);

  return (
    <div className=" absolute inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
      <div className="bg-[url('/book.png')] bg-center bg-cover rounded-xl shadow-lg p-8 max-w-11/12 w-full relative ">

        <button className="absolute top-2 right-12 text-amber-700 text-2xl" onClick={onClose}>&times;</button>
        {loading ? (
          <div>Chargement...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : monster ? (
          <div className="text-md px-20">            
            <div className="text-2xl ml-6 font-bold mb-4 text-amber-800 font-serif">{monster.name}</div>
            <div className="mb-2 ml-6 text-xl">Niveau de difficulté : {monster.challenge_rating}</div>
            <div className="flex justify-between items-center w-full">
              {monster.image && (
                <Image
                  src={monster.image.startsWith("/") ? `https://www.dnd5eapi.co${monster.image}` : monster.image}
                  alt={monster.name}
                  width={500}
                  height={500}
                  className="mb-4 ml-20 h-[500px]"
                />
              )}
              <div className=" grid gap-2 max-w-5/12 font-script">
                <div className="flex">
                  <div className="p-3 w-1/2 ">
                    <div className="mb-2">Type : {monster.type}</div>
                    <div className="mb-2">Taille : {monster.size}</div>
                    <div className="mb-2">Alignement : {monster.alignment}</div>
                    <div className="mb-2">Langues : {monster.languages}</div>
                    <div className="mb-2">Classe d{'\''}armure : {
                      Array.isArray(monster.armor_class)
                        ? monster.armor_class.map((ac, i) => (
                            <span key={i}>{ac.type} ({ac.value}){i < (monster.armor_class as {type:string;value:number}[]).length - 1 ? ', ' : ''}</span>
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
                  <div className="p-3">
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
                      <div className="mb-2">Immunités aux conditions : {(monster.condition_immunities as ({name?:string}|string)[]).map((ci) => typeof ci === 'string' ? ci : ci.name).join(', ')}</div>
                    )}
                  </div>
                </div>
                <div className="flex">
                  {monster.proficiencies && monster.proficiencies.length > 0 && (
                    <div className="mb-2 p-3 w-1/2 ">
                      <b>Compétences :</b>
                      <ul className="list-none ml-4">
                        {monster.proficiencies.map((p, i) => (
                          <li key={i}>{typeof p.proficiency === 'string' ? p.proficiency : p.proficiency.name} (+{p.value})</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {monster.special_abilities && monster.special_abilities.length > 0 && (
                    <div className="mb-2 p-3">
                      <b>Capacités spéciales :</b>
                      <ul className="list-none ml-4">
                        {monster.special_abilities.map((a, i) => (
                          <li key={i} className="relative">
                            <b>{a.name}</b>
                            {a.desc && (
                              <span className="ml-2 cursor-pointer group">
                                <span className="text-amber-700 font-bold">&#x3f;</span>
                                <span className="absolute left-6 top-0 z-10 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 shadow-lg w-64">
                                  <div>{a.desc}</div>
                                  {a.damage && a.damage.length > 0 && (
                                    <div className="mt-2">
                                      <b>Dégâts :</b> {a.damage.map((d) => `${typeof d.damage_type === 'string' ? d.damage_type : d.damage_type?.name}: ${d.damage_dice}`).join(', ')}
                                    </div>
                                  )}
                                </span>
                              </span>
                            )}
                            {a.damage && a.damage.length > 0 && !a.desc && (
                              <span> <b>Dégâts :</b> {a.damage.map((d) => `${typeof d.damage_type === 'string' ? d.damage_type : d.damage_type?.name}: ${d.damage_dice}`).join(', ')}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              
            
                <div className="flex">
                  {monster.actions && monster.actions.length > 0 && (
                    <div className="mb-2 w-1/2  p-3">
                      <b>Actions :</b>
                      <ul className="list-none ml-4">
                        {monster.actions.map((a, i) => (
                          <li key={i} className="relative">
                            <b>{a.name}</b>
                            {a.desc && (
                              <span className="ml-2 cursor-pointer group">
                                <span className="text-amber-700 font-bold">&#x3f;</span>
                                <span className="absolute left-6 top-0 z-10 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 shadow-lg w-64">
                                  <div>{a.desc}</div>
                                  {a.damage && a.damage.length > 0 && (
                                    <div className="mt-2">
                                      <b>Dégâts :</b> {a.damage.map((d) => `${typeof d.damage_type === 'string' ? d.damage_type : d.damage_type?.name}: ${d.damage_dice}`).join(', ')}
                                    </div>
                                  )}
                                </span>
                              </span>
                            )}
                            {a.damage && a.damage.length > 0 && !a.desc && (
                              <span> <b>Dégâts :</b> {a.damage.map((d) => `${typeof d.damage_type === 'string' ? d.damage_type : d.damage_type?.name}: ${d.damage_dice}`).join(', ')}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {monster.legendary_actions && monster.legendary_actions.length > 0 && (
                    <div className="mb-2 p-3">
                      <b>Actions légendaires :</b>
                      <ul className="list-none ml-4">
                        {monster.legendary_actions.map((a, i) => (
                          <li key={i} className="relative">
                            <b>{a.name}</b>
                            {a.desc && (
                              <span className="ml-2 cursor-pointer group">
                                <span className="text-amber-700 font-bold">&#x3f;</span>
                                <span className="absolute left-6 top-0 z-10 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 shadow-lg w-64">
                                  <div>{a.desc}</div>
                                  {a.damage && a.damage.length > 0 && (
                                    <div className="mt-2">
                                      <b>Dégâts :</b> {a.damage.map((d) => `${typeof d.damage_type === 'string' ? d.damage_type : d.damage_type?.name}: ${d.damage_dice}`).join(', ')}
                                    </div>
                                  )}
                                </span>
                              </span>
                            )}
                            {a.damage && a.damage.length > 0 && !a.desc && (
                              <span> <b>Dégâts :</b> {a.damage.map((d) => `${typeof d.damage_type === 'string' ? d.damage_type : d.damage_type?.name}: ${d.damage_dice}`).join(', ')}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
