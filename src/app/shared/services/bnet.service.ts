import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Character, Pet, Realm} from '../models';
import {environment} from '../../../environments/environment';
import {Router} from "@angular/router";

@Injectable()
export class BnetService {

  private SOURCE_CHARACTER = 'Character';

  private key = environment.bnetServiceKey;
  private url = environment.bnetServiceUrl;

  public character: Character = new Character();
  public pets: Pet[] = [];

  // ---------------------------------------------------
  // INITIALIZE
  // ---------------------------------------------------


  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }


  // ---------------------------------------------------
  // FUNCTIONS
  // --------------------------------------------------


  /**
   *
   * @param {HttpErrorResponse} error
   * @param {string} source
   * @returns {Observable<any>}
   */
  private handleError(error: HttpErrorResponse, source: string): Observable<any> {

    // 404 - not found
    if (error.status && error.status === 404) {
      this.router.navigate(['character-not-found']);
      return Observable.throw(`${source} not found`);
    }
    return Observable.throw(error);
  }


  /**
   *
   * @param region
   * @param {string} character
   * @param {string} realm
   * @returns {Observable<boolean>}
   */
  public loadCharacter(region: string, realm: string, character: string): Observable<boolean> {
    const url = `https://${region}.${this.url}character/${realm}/${character}?fields=pets,mounts&apikey=${this.key}`;
    return <Observable<boolean>>this.http
      .get(url)
      .do((response: Character) => this.character = response)
      .catch((error: HttpErrorResponse) => this.handleError(error, this.SOURCE_CHARACTER));
  }


  /*
    /!**
     *
     * @returns {Observable<boolean>}
     *!/
    public loadMounts(): Observable<boolean> {
      return Observable.of(true);
    }
  */


  /**
   *
   * @param {string} region
   * @returns {Observable<boolean>}
   */
  public loadPets(region: string): Observable<boolean> {
    const url = `https://${region}.${this.url}pet/?fields=species&apikey=${this.key}`;
    return <Observable<boolean>>this.http
      .get(url)
      .do((response: any) => this.pets = response.pets);
  }


  /**
   *
   * @param {string} region
   * @returns {Observable<any>}
   */
  public loadRealms(region: string): Observable<any> {
    const url = `https://${region}.${this.url}realm/status?&apikey=${this.key}`;
    return <Observable<boolean>>this.http
      .get(url)
      .map((response: any) => response.realms);
  }


  /*
    /!**
     *
     * @param {string} region
     *!/
    public setRegion(region: string): void {
      this.region = region;
    }
  */

}
