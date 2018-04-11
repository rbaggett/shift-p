import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {BnetService} from '../../shared/services';
import {Realm} from '../../shared/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public formGroup: FormGroup;
  public selectedRegion: string;
  public seletedRealm: Realm;
  public realms: Realm[] = [];

  // ---------------------------------------------------
  // INITIALIZE
  // ---------------------------------------------------

  constructor(private bnetService: BnetService,
              private formBuilder: FormBuilder) {
  }


  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      realm: [null, Validators.required],
      region: [null, Validators.required],
      name: [null, Validators.required]
    });
  }


  // ---------------------------------------------------
  // FUNCTIONS
  // --------------------------------------------------


  /**
   *
   */
  public changeRegion(): void {
    this.bnetService.loadRealms(this.formGroup.controls['region'].value)
      .subscribe(
        (realms: Realm[]) => this.realms = realms,
        (error: any) => console.dir(error)
      );
  }


  /**
   *
   */
  public submitSearch(): void {

  }
}
