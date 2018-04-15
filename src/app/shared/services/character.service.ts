import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import * as _ from 'lodash';

import {BnetService} from './bnet.service';
import {Character, CharacterPet, MergedPet, Pet} from '../models';


@Injectable()
export class CharacterService {

  public character: Character;

  // ---------------------------------------------------
  // INITIALIZE
  // ---------------------------------------------------


  constructor(
    private bnetService: BnetService
  ) { }




  // ---------------------------------------------------
  // FUNCTIONS
  // --------------------------------------------------


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




  private getPetTheme(quality): string {
    const theme = {
      4: 'primary',
      3: 'primary',
      2: 'success'
    };
    return theme[quality] || 'default';
  }




  /**
   *
   * @returns {Observable<boolean>}
   */
  public mergePets(): Observable<boolean> {

    let characterPets: CharacterPet[] = [];
    let masterPets: Pet[] = [];
    let mergedPets: MergedPet[] = [];

    characterPets = characterPets.concat(this.bnetService.character.pets.collected);
    masterPets = masterPets.concat(this.bnetService.pets);

    masterPets.forEach(masterPet => {

      const collectedPets = _.filter(characterPets, {creatureId: masterPet.creatureId});
      let mergedPet = new MergedPet();

      
      if (collectedPets.length) {
        collectedPets.forEach(collectedPet => {
          mergedPet = _.extend(mergedPet, collectedPet);
          mergedPet.collected = true;
          mergedPet.duplicate = collectedPet.index > 0;
          mergedPet.original = collectedPet.index === 0;
          mergedPet.store = this.getPetStore(collectedPet.creatureId);
          mergedPet.tcg = this.getPetTcg(collectedPet.creatureId);
          mergedPet.theme = this.getPetTheme(collectedPet.qualityId);
        });
      } else {
        mergedPet.collected = false;
        mergedPet.creatureName = masterPet.name;
        mergedPet.store = this.getPetStore(masterPet.creatureId);
        mergedPet.tcg = this.getPetTcg(masterPet.creatureId);
        mergedPet.theme = this.getPetTheme(masterPet.qualityId);
      }
      mergedPets.push(mergedPet);
    });

    console.dir(mergedPets);
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
