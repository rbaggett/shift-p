import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Character, Pet, Realm} from '../models';
import {environment} from '../../../environments/environment';

@Injectable()
export class BnetService {

  public character: Character = new Character();
  public pets: Pet[] = [];
  // public realms: Realm[] = [];

  // ---------------------------------------------------
  // INITIALIZE
  // ---------------------------------------------------


  constructor(private http: HttpClient) {
  }


  // ---------------------------------------------------
  // FUNCTIONS
  // --------------------------------------------------


  /**
   *
   * @returns {Observable<boolean>}
   */
  public loadRealms(region: string): Observable<any> {
    // if (this.realms.length) {
    //   return Observable.of(true);
    // } else {
      return <Observable<boolean>>this.http
        .get(`https://${region}.${environment.bnetServiceUrl}realm/status?&apikey=${environment.bnetServiceKey}`)
        .map((response: any) => response.realms);
    // }
  }


  // /**
  //  *
  //  * @param {Realm[]} realms
  //  */
  // private setRealms(realms: Realm[]): void {
  //   this.realms.length = 0;
  //   this.realms = this.realms.concat(realms);
  // }
}
