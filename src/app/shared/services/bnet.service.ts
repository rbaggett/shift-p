import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Character, Pet, Realm} from '../models';
import {environment} from '../../../environments/environment';

@Injectable()
export class BnetService {

  private key = environment.bnetServiceKey;
  private url = environment.bnetServiceUrl;

  public character: Character = new Character();
  public pets: Pet[] = [];
  public mounts = [];
  public region: string;

  // ---------------------------------------------------
  // INITIALIZE
  // ---------------------------------------------------


  constructor(private http: HttpClient) {
  }


  // ---------------------------------------------------
  // FUNCTIONS
  // --------------------------------------------------


  public loadCharacter(character: string, realm: string): Observable<boolean> {
    const url = `https://${this.region}.${this.url}character/${realm}/${character}?fields=pets,mounts&apikey=${this.key}`;
    return <Observable<boolean>>this.http
      .get(url)
      .do((response: any) => {
        this.character = response;
        console.dir(response);
      });
  }


  public loadMounts(): Observable<boolean> {
    return Observable.of(true);
  }


  public loadPets(): Observable<boolean> {
    const url = `https://${this.region}.${this.url}pet/?fields=species&apikey=${this.key}`;
    return <Observable<boolean>>this.http
      .get(url)
      .do((response: any) => {
        this.pets = response;
        console.dir(response);
      });
  }


  /**
   *
   * @returns {Observable<boolean>}
   */
  public loadRealms(): Observable<any> {
    const url = `https://${this.region}.${this.url}realm/status?&apikey=${this.key}`;
    return <Observable<boolean>>this.http
      .get(url)
      .map((response: any) => response.realms);
  }


  public setRegion(region: string): void {
    this.region = region;
  }
}
