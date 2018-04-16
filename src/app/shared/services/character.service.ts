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


  private getPetBreeds(id: number): PetBreed {
    const breeds = {
      4: {breed: 'P/P', gender: 'male'},
      14: {breed: 'P/P', gender: 'female'},
      5: {breed: 'S/S', gender: 'male'},
      15: {breed: 'S/S', gender: 'female'},
      6: {breed: 'H/H', gender: 'male'},
      16: {breed: 'H/H', gender: 'female'},
      7: {breed: 'H/P', gender: 'male'},
      17: {breed: 'H/P', gender: 'female'},
      8: {breed: 'P/S', gender: 'male'},
      18: {breed: 'P/S', gender: 'female'},
      9: {breed: 'H/S', gender: 'male'},
      19: {breed: 'H/S', gender: 'female'},
      10: {breed: 'P/B', gender: 'male'},
      20: {breed: 'P/B', gender: 'female'},
      11: {breed: 'S/B', gender: 'male'},
      21: {breed: 'S/B', gender: 'female'},
      12: {breed: 'H/B', gender: 'male'},
      22: {breed: 'H/B', gender: 'female'},
      3: {breed: 'B/B', gender: 'male'},
      13: {breed: 'B/B', gender: 'female'}
    };
    return breeds[id] || null;
  }




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




  /**
   *
   * @returns {Observable<boolean>}
   */
  public mergePets(): Observable<boolean> {

    let characterPets: CharacterPet[] = Array.from(this.bnetService.character.pets.collected);
    let masterPets: Pet[] = Array.from(this.bnetService.pets);
    let mergedPets: MergedPet[] = [];

    // loop through the master pet list
    masterPets.forEach(masterPet => {

      // create a merged pet instance
      let mergedPet = _.extend(new MergedPet(), masterPet);
      mergedPet.familyImageUrl = `../../../assets/images/pet/Pet_type_${mergedPet.family}.png`;

      // look for any matching pets in character collection
      const matchingPets = _.filter(characterPets, {creatureId: masterPet.creatureId});

      if (matchingPets.length) {
        // create a collected pet for each match
        matchingPets.forEach((matchingPet, index) => {
          let collectedPet = Object.create(_.extend(mergedPet, matchingPet));
          collectedPet.collected = true;
          collectedPet.duplicate = index > 0;
          collectedPet.original = index === 0;
          collectedPet.store = this.getPetStore(matchingPet.creatureId);
          collectedPet.tcg = this.getPetTcg(matchingPet.creatureId);
          collectedPet.theme = this.getPetTheme(matchingPet.qualityId);
          collectedPet.iconClass = `icon-${collectedPet.theme}`;
          collectedPet.iconUrl = `${environment.blizzardIcon36}${collectedPet.icon}.jpg`;
          collectedPet.wowHeadUrl = `${environment.wowHeadUrl}${collectedPet.creatureId}`;
          collectedPet.breed = this.getPetBreeds(matchingPet.stats.breedId);
          mergedPets.push(collectedPet);
        });
      } else {
        mergedPet.collected = false;
        mergedPet.creatureName = masterPet.name;
        mergedPet.store = this.getPetStore(masterPet.creatureId);
        mergedPet.tcg = this.getPetTcg(masterPet.creatureId);
        mergedPet.theme = this.getPetTheme(masterPet.qualityId);
        mergedPet.iconClass = `icon-${mergedPet.theme}`;
        mergedPet.iconUrl = `${environment.blizzardIcon36}${mergedPet.icon}.jpg`;
        mergedPet.wowHeadUrl = `${environment.wowHeadUrl}${mergedPet.creatureId}`;
        mergedPet.breed = this.getPetBreeds(mergedPet.stats.breedId);
        mergedPets.push(mergedPet);
      }
    });
    this.mergedPets.length = 0;
    this.mergedPets = Array.from(mergedPets);
    this.mergedPets = _.sortBy(this.mergedPets, ['creatureName']);
    return Observable.of(true);
  }




  /**
   *
   * @param {Character} character
   */
  public setCharacter(character: Character): void {
    this.character = character;
  }

}
