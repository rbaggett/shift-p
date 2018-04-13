import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BnetService} from '../services';

@Injectable()
export class CharacterResolver implements Resolve<any> {

  // ---------------------------------------------------
  // INITIALIZE
  // ---------------------------------------------------

  constructor(
    private bnetService: BnetService
  ) { }




  // ---------------------------------------------------
  // FUNCTIONS
  // ---------------------------------------------------


  /**
   * Application data resolve to load before application routes
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const region = route.params['region'];
    const realm = route.params['realm'];
    const character = route.params['character'];

    const character = this.bnetService.loadCharacter(region, realm, character);
    const pets = this.bnetService.loadPets(region);

    return forkJoin([character, pets]);
  }

}