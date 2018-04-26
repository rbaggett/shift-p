import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Character, MergedPet, Pet, PetSpecies, Realm} from '../models';
import {environment} from '../../../environments/environment';
import {Router} from "@angular/router";

@Injectable()
export class BnetService {

  private SOURCE_CHARACTER = 'Character';

  private serviceKey = environment.bnetServiceKey;
  private serviceUrl = environment.bnetServiceUrl;

  public character: Character = new Character();
  public pets: Pet[] = [];

  // ---------------------------------------------------
  // INITIALIZE
  // ---------------------------------------------------


  constructor(
    private http: HttpClient,
    private router: Router
  ) { }




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
   * @param {MergedPet} pet
   * @returns {Observable<any>}
   */
  public getSpecies(pet: MergedPet): Observable<any> {
    const url = `https://${this.character.region}.${this.serviceUrl}pet/species/${pet.stats.speciesId}?&apikey=${this.serviceKey}`;
    return <Observable<boolean>>this.http.get(url);
  }




  /**
   *
   * @param region
   * @param {string} character
   * @param {string} realm
   * @returns {Observable<boolean>}
   */
  public loadCharacter(region: string, realm: string, character: string): Observable<boolean> {
    const url = `https://${region}.${this.serviceUrl}character/${realm}/${character}?fields=pets,mounts&apikey=${this.serviceKey}`;
    return <Observable<boolean>>this.http
      .get(url)
      .do((response: Character) => {
        this.character = response;
        this.character.region = region;
      })
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
    const url = `https://${region}.${this.serviceUrl}pet/?fields=species&apikey=${this.serviceKey}`;
    return <Observable<boolean>>this.http
      .get(url)
      .do((response: any) => {
        console.dir(response.pets);
        this.pets = response.pets;
      });
  }




  /**
   *
   * @param {string} region
   * @returns {Observable<any>}
   */
  public loadRealms(region: string): Observable<any> {
    const url = `https://${region}.${this.serviceUrl}realm/status?&apikey=${this.serviceKey}`;
    return <Observable<boolean>>this.http
      .get(url)
      .map((response: any) => response.realms);
  }


}
