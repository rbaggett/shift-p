import {Component, OnInit, ViewChild} from '@angular/core';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

import {BnetService} from '../../shared/services';
import {CharacterAvatar, Realm} from '../../shared/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('formDirective') formDirective: FormGroupDirective;

  public avatar = new CharacterAvatar();
  public formGroup: FormGroup;
  public realm: FormControl;
  public region: FormControl;
  public name: FormControl;

  public realms: Realm[] = [];
  public filteredRealms: Observable<Realm[]>;


  // ---------------------------------------------------
  // INITIALIZE
  // ---------------------------------------------------

  constructor(
    private bnetService: BnetService,
    private router: Router
  ) {
  }




  ngOnInit() {
    this.buildForm();
    this.changeRegion();
  }




  // ---------------------------------------------------
  // FUNCTIONS
  // --------------------------------------------------


  /**
   *
   */
  private buildForm(): void {
    this.buildFormControls();
    this.buildFormGroup();
    this.buildFormSubscriptions();
  }




  /**
   *
   */
  private buildFormControls(): void {
    this.realm = new FormControl(null, Validators.required);
    this.region = new FormControl('US', Validators.required);
    this.name = new FormControl(null, Validators.required);
  }




  /**
   *
   */
  private buildFormGroup(): void {
    this.formGroup = new FormGroup({
      realm: this.realm,
      region: this.region,
      name: this.name
    });
  }




  /**
   *
   */
  private buildFormSubscriptions(): void {
    this.filteredRealms = this.realm.valueChanges
      .startWith('')
      .map(search => search ? this.filterRealms(search) : this.realms.slice());
  }




  /**
   *
   */
  public changeRegion(): void {
    // reset form
    this.realm.reset();
    this.name.reset();
    // this.bnetService.setRegion(this.region.value);

    // fetch region-realms
    this.bnetService.loadRealms(this.region.value)
      .subscribe(
        (realms: Realm[]) => this.realms = realms,
        (error: any) => console.dir(error)
      );
  }




/*
  /!**
   *
   *!/
  private displayCharacter(): void {
    this.setAvatar();
    this.router.navigate(['/collections']);
  }
*/




  /**
   *
   * @param {string} search
   * @returns {Realm[]}
   */
  private filterRealms(search: string) {
    return this.realms.filter(realm =>
      realm.name.toLowerCase().indexOf(search.toLowerCase()) === 0
    );
  }




  /**
   *
   */
  private resetForm(): void {
    const region = this.region.value;
    this.formDirective.resetForm();
    this.region.setValue(region);
  }




/*
  /!**
   *
   *!/
  private setAvatar(): void {
    const character = this.bnetService.character;
    this.avatar.name = character.name;
    this.avatar.realm = character.realm;
    this.avatar.region = this.bnetService.region;
    this.avatar.url = `http://render-us.worldofwarcraft.com/character/${character.thumbnail}`;
  }
*/




  /**
   *
   */
  public submitSearch(): void {
    const route = `/${this.region.value}/${this.realm.value}/${this.name.value}`;

    this.resetForm();
    this.router.navigate([route]);
/*
    const character = this.bnetService.loadCharacter(this.name.value, this.realm.value);
    const pets = this.bnetService.loadPets();
    forkJoin([character, pets]).subscribe(
      () => this.displayCharacter(),
      (error) => console.dir(error),
      () => this.resetForm()
    );
*/
  }
}
