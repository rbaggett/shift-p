import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import * as _ from 'lodash';

import {BnetService} from './bnet.service';
import {Character, CharacterPet, MergedPet, Pet, PetBreed} from '../models';
import {environment} from "../../../environments/environment";


@Injectable()
export class CharacterService {

  public character: Character;
  public mergedPets: MergedPet[] = [];

  // ---------------------------------------------------
  // INITIALIZE
  // ---------------------------------------------------


  constructor(
    private bnetService: BnetService
  ) {
  }




  // ---------------------------------------------------
  // FUNCTIONS
  // --------------------------------------------------




  /**
   *
   * @returns {Observable<boolean>}
   */
  public mergePets(): Observable<boolean> {
    const characterPets: CharacterPet[] = Array.from(this.bnetService.character.pets.collected);
    const masterPets: Pet[] = Array.from(this.bnetService.pets);
    this.mergedPets.length = 0;

    for (let i = 0, j = masterPets.length; i < j; i++) {
      const mergedPet = _.extend(new MergedPet(), masterPets[i]);
      const matchingPets = _.filter(characterPets, {creatureId: mergedPet.creatureId});
      if (matchingPets.length) {
        this.addCollectedPets(matchingPets, mergedPet);
      } else {
        this.addUncollectedPet(mergedPet);
      }
    }
    this.mergedPets = _.sortBy(this.mergedPets, ['creatureName']);
    return Observable.of(true);
  }




  /**
   *
   * @param {CharacterPet[]} matchingPets
   * @param {MergedPet} mergedPet
   */
  private addCollectedPets(matchingPets: CharacterPet[], mergedPet: MergedPet): void {
    for (let k = 0, l = matchingPets.length; k < l; k++) {
      const collectedPet = _.clone(_.extend(mergedPet, matchingPets[k]));
      collectedPet.familyImageUrl = `../../../assets/images/pet/Pet_type_${collectedPet.family}.png`;
      collectedPet.collected = true;
      collectedPet.duplicate = k > 0;
      collectedPet.original = k === 0;
      collectedPet.store = this.getPetStore(collectedPet.creatureId);
      collectedPet.tcg = this.getPetTcg(collectedPet.creatureId);
      collectedPet.theme = this.getPetTheme(collectedPet.qualityId);
      collectedPet.iconClass = `icon-${collectedPet.theme}`;
      collectedPet.iconUrl = `${environment.blizzardIcon36}${collectedPet.icon}.jpg`;
      collectedPet.wowHeadUrl = `${environment.wowHeadUrl}${collectedPet.creatureId}`;
      collectedPet.breed = this.getPetBreeds(collectedPet.stats.breedId);
      this.mergedPets.push(collectedPet);
    }
  }




  /**
   *
   * @param {MergedPet} mergedPet
   */
  private addUncollectedPet(mergedPet: MergedPet): void {
    mergedPet.familyImageUrl = `../../../assets/images/pet/Pet_type_${mergedPet.family}.png`;
    mergedPet.collected = false;
    mergedPet.creatureName = mergedPet.name;
    mergedPet.store = this.getPetStore(mergedPet.creatureId);
    mergedPet.tcg = this.getPetTcg(mergedPet.creatureId);
    mergedPet.theme = this.getPetTheme(mergedPet.qualityId);
    mergedPet.iconClass = `icon-${mergedPet.theme}`;
    mergedPet.iconUrl = `${environment.blizzardIcon36}${mergedPet.icon}.jpg`;
    mergedPet.wowHeadUrl = `${environment.wowHeadUrl}${mergedPet.creatureId}`;
    mergedPet.breed = this.getPetBreeds(mergedPet.stats.breedId);
    this.mergedPets.push(mergedPet);
  }




  /**
   *
   * @param {number} id
   * @returns {PetBreed}
   */
  private getPetBreeds(id: number): PetBreed {
    const breeds = {
      3: {breed: 'B/B', gender: 'male'},
      4: {breed: 'P/P', gender: 'male'},
      5: {breed: 'S/S', gender: 'male'},
      6: {breed: 'H/H', gender: 'male'},
      7: {breed: 'H/P', gender: 'male'},
      8: {breed: 'P/S', gender: 'male'},
      9: {breed: 'H/S', gender: 'male'},
      10: {breed: 'P/B', gender: 'male'},
      11: {breed: 'S/B', gender: 'male'},
      12: {breed: 'H/B', gender: 'male'},
      13: {breed: 'B/B', gender: 'female'},
      14: {breed: 'P/P', gender: 'female'},
      15: {breed: 'S/S', gender: 'female'},
      16: {breed: 'H/H', gender: 'female'},
      17: {breed: 'H/P', gender: 'female'},
      18: {breed: 'P/S', gender: 'female'},
      19: {breed: 'H/S', gender: 'female'},
      20: {breed: 'P/B', gender: 'female'},
      21: {breed: 'S/B', gender: 'female'},
      22: {breed: 'H/B', gender: 'female'}
    };
    return breeds[id] || null;
  }




  /**
   *
   * @param id
   * @returns {string}
   */
  private getPetStore(id): string {
    const storePets = {
      85283: 'brightpaw',
      74402: 'alterac-brew-pup',
      88807: 'argi',
      71488: 'blossoming-ancient',
      53623: 'cenarion-hatchling',
      68267: 'cinder-kitten',
      36979: 'lil-kt',
      51600: 'lil-ragnaros',
      40703: 'lil-xt',
      51601: 'moonkin-hatchling',
      51649: 'moonkin-hatchling',
      36911: 'pandaren-monk',
      58163: 'soul-of-the-aspects'
    };
    return storePets[id] || null;
  }




  /**
   *
   * @param id
   * @returns {string}
   */
  private getPetTcg(id): string {
    const tcgPets = {
      23234: 'banana_charm',
      59020: 'eye_of_the_legion',
      34694: 'heavy_murloc_egg',
      50468: 'landros_lil_xt',
      54438: 'murkys_little_soulstone',
      54383: 'purple_puffer',
      51122: 'smoldering_murloc_egg',
      36482: 'tuskarr_kite',
      15186: 'blue_murloc_egg',
      54730: 'grell_moss',
      17255: 'hippogryph_hatchling',
      52344: 'nightsaber_cub',
      25109: 'rocket_chicken',
      27914: 'soultrader_beacon',
      29089: 'tyraels_hilt',
      25110: 'dragon_kite',
      69208: 'gusting_grimoire',
      52343: 'landros_lichling',
      74405: 'murkalots_flail',
      54745: 'sand_scarab',
      36511: 'spectral_tiger_cub',
      11325: 'wow_vanilla_collectors_edition',
      11326: 'wow_vanilla_collectors_edition',
      11327: 'wow_vanilla_collectors_edition'
    };
    return tcgPets[id] || null;
  }




  /**
   *
   * @param quality
   * @returns {string}
   */
  private getPetTheme(quality): string {
    const theme = {
      4: 'rare',
      3: 'rare',
      2: 'uncommon'
    };
    return theme[quality] || 'default';
  }

}
