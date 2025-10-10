export type Monsters = {
    index: string;
    name: string;
    url: string;
}[];

export type Races = {
    index: string;
    name: string;
    url: string;
}[];

export type MonsterDetails = {
  index: string;
  name: string;
  size: string;
  type: string;
  alignment: string;
  armor_class: { type: string; value: number }[] | number;
  hit_points: number;
  hit_dice: string;
  hit_points_roll?: string;
  speed: Record<string, string> | string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  proficiencies: {
    value: number;
    proficiency: {
      index: string;
      name: string;
      url: string;
    } | string;
  }[];
  damage_vulnerabilities: string[];
  damage_resistances: string[];
  damage_immunities: string[];
  condition_immunities: { name?: string }[] | string[];
  senses: Record<string, string | number> | string;
  languages: string;
  challenge_rating: number;
  proficiency_bonus?: number;
  xp?: number;
  special_abilities?: {
    name: string;
    desc: string;
    damage?: {
      damage_type?: { name?: string; index?: string; url?: string } | string;
      damage_dice?: string;
    }[];
    usage?: {
      type?: string;
      dice?: string;
      min_value?: number;
    };
    dc?: {
      dc_type?: { name?: string; index?: string; url?: string } | string;
      dc_value?: number;
      success_type?: string;
    };
  }[];
  actions?: {
    name: string;
    desc: string;
    attack_bonus?: number;
    damage?: {
      damage_type?: { name?: string; index?: string; url?: string } | string;
      damage_dice?: string;
    }[];
    actions?: {
      name?: string;
      desc?: string;
    }[];
    dc?: {
      dc_type?: { name?: string; index?: string; url?: string } | string;
      dc_value?: number;
      success_type?: string;
    };
    usage?: {
      type?: string;
      dice?: string;
      min_value?: number;
    };
    multiattack_type?: string;
  }[];
  legendary_actions?: {
    name: string;
    desc: string;
    damage?: {
      damage_type?: { name?: string; index?: string; url?: string } | string;
      damage_dice?: string;
    }[];
    dc?: {
      dc_type?: { name?: string; index?: string; url?: string } | string;
      dc_value?: number;
      success_type?: string;
    };
  }[];
  image?: string;
  url?: string;
  updated_at?: string;
  forms?: {
    index?: string;
    name?: string;
    url?: string;
  }[];
  reactions?: {
    name?: string;
    desc?: string;
  }[];
};
