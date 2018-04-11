import {PetStats} from './pet.model';

export class Character {
  achievementPoints: number;
  battlegroup: string;
  calcClass: string;
  class: number;
  faction: number;
  gender: number;
  lastModified: string;
  level: number;
  name: string;
  pets: CharacterPets;
  race: number;
  realm: string;
  thumbnail: string;
  totalHonorableKills: number;
}

export class CharacterAvatar {
  name: string;
  realm: string;
  region: string;
  url: string;
}

export class CharacterPet {
  battlePetGuid: string;
  canBattle: boolean;
  creatureId: number;
  creatureName: string;
  icon: string;
  isFavorite: boolean;
  isFirstAbilitySlotSelected: boolean;
  isSecondAbilitySlotSelected: boolean;
  isThirdAbilitySlotSelected: boolean;
  itemId: number;
  name: string;
  qualityId: number;
  spellId: number;
  stats: PetStats;
}

export class CharacterPets {
  collected: CharacterPet[];
  numCollected: number;
  numNotCollected: number;
}
