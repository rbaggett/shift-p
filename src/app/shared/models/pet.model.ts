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
  canBattle: boolean;
  collected: boolean;
  creatureId: number;
  creatureName: string;
  duplicate: boolean;
  family: string;
  icon: string;
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
}
