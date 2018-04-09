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

