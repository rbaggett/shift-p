import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Character, Pet, Realm} from '../models';
import {environment} from '../../../environments/environment';
import {CharacterService} from './character.service';

@Injectable()
export class BnetService {

  private key = environment.bnetServiceKey;
  private url = environment.bnetServiceUrl;

/*
  public character: Character = new Character();
  public pets: Pet[] = [];
  public mounts = [];
  public region: string;
*/

  public character: Character = new Character();
  public pets: Pet[] = [];

  // ---------------------------------------------------
  // INITIALIZE
  // ---------------------------------------------------


  constructor(
    private characterService: CharacterService,
    private http: HttpClient
  ) { }




  // ---------------------------------------------------
  // FUNCTIONS
  // --------------------------------------------------


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
      .do((response: Character) => this.character = response);
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
      .do((response: any) => this.pets = response);
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
