import {Injectable} from '@angular/core';

import {Character} from '../models';


@Injectable()
export class CharacterService {

  public character: Character;


  // ---------------------------------------------------
  // INITIALIZE
  // ---------------------------------------------------


  constructor() { }




  // ---------------------------------------------------
  // FUNCTIONS
  // --------------------------------------------------




  /**
   *
   * @param {Character} character
   */
  public setCharacter(character: Character): void {
    this.character = character;
  }

}
