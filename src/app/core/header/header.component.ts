import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
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
    this.loadRealms();
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
    this.realm = new FormControl(null);
    this.region = new FormControl('US');
    this.name = new FormControl(null);
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
    this.resetForm();
    this.loadRealms();
  }




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
  private loadRealms(): void {
    this.bnetService.loadRealms(this.region.value)
      .subscribe(
        (realms: Realm[]) => this.realms = realms,
        (error: any) => console.dir(error)
      );
  }




  /**
   *
   */
  private resetForm(): void {
    this.realm.reset();
    this.name.reset();
    this.region.setValue(this.region.value);
  }




  /**
   *
   */
  public submitSearch(): void {
    const region = this.region.value.toLowerCase();
    const realm = this.realm.value.toLowerCase();
    const name = this.name.value.toLowerCase();
    const route = `/${region}/${realm}/${name}`;

    this.resetForm();
    this.router.navigate([route]);
  }
}
