export class Pet {
  canBattle: boolean;
  creatureId: number;
  name: string;
  family: string;
  icon: string;
  qualityId: number;
  stats: PetStats;
  strongAgainst: string[];
  typeId: number;
  weakAgainst: string[];
}

export class PetAbility {
  cooldown: number;
  hideHints: boolean;
  icon: string;
  id: number;
  isPassive: boolean;
  name: string;
  order: number;
  petTypeId: number;
  requiredLevel: number;
  rounds: number;
  slot: number;
}

export class PetBreed {
  breed: string;
  gender: string;
}

export class PetSpecies {
  abilities: PetAbility[];
  canBattle: boolean;
  creatureId: number;
  description: string;
  icon: string;
  name: string;
  petTypeId: number;
  speciesId: number;
  source: string;
}

export class PetStats {
  breedId: number;
  health: number;
  level: number;
  petQualityId: number;
  power: number;
  speciesId: number;
  speed: number;
}

export class MergedPet {
  battlePetGuid: string;
  breed: PetBreed;
  canBattle: boolean;
  collected: boolean;
  creatureId: number;
  creatureName: string;
  duplicate: boolean;
  family: string;
  familyImageUrl: string;
  icon: string;
  iconClass: string;
  iconUrl: string;
  isFavorite: boolean;
  isFirstAbilitySlotSelected: boolean;
  isSecondAbilitySlotSelected: boolean;
  isThirdAbilitySlotSelected: boolean;
  itemId: number;
  name: string;
  original: boolean;
  qualityId: number;
  spellId: number;
  stats: PetStats;
  store: string;
  strongAgainst: string[];
  tcg: string;
  theme: string;
  typeId: number;
  weakAgainst: string[];
  wowHeadUrl: string;
}

