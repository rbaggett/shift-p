import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BnetService} from '../services';

@Injectable()
export class DataResolver implements Resolve<any> {

  // ---------------------------------------------------
  // INITIALIZE
  // ---------------------------------------------------

  constructor(
    private bnetService: BnetService
  ) {}




  // ---------------------------------------------------
  // FUNCTIONS
  // ---------------------------------------------------




  /**
   * Application data resolve to load before application routes
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    // const realms = this.bnetService.loadRealms();
    // return forkJoin([realms]);
  // }

}
