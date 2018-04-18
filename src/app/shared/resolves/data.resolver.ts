import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BnetService} from '../services';

@Injectable()
export class DataResolver implements Resolve<any> {

  // ---------------------------------------------------
  // INITIALIZE
  // ---------------------------------------------------

  constructor(private bnetService: BnetService) {
  }


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

    // const pets = this.bnetService.loadPets(region);
    // const realms = this.bnetService.loadRealms(region);

    // return forkJoin([pets, realms]);
    return this.bnetService.loadRealms(region);
  }

}
