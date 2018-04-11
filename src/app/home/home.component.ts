import {Component, OnInit} from '@angular/core';

// import {BnetService} from '../shared/services';
// import {Realm} from '../shared/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // public region: string;
  // public realm: Realm;
  // public realms: Realm[] = [];


  // ---------------------------------------------------
  // INITIALIZE
  // ---------------------------------------------------

  constructor(// private bnetService: BnetService
  ) {
  }


  ngOnInit() {
    // this.realms = this.bnetService.realms;
  }


  // ---------------------------------------------------
  // FUNCTIONS
  // --------------------------------------------------


  // public changeRegion(): void {
  //   this.bnetService.loadRealms()
  //     .subscribe(
  //       (realms: Realm[]) => this.realms = realms,
  //       (error: any) => console.dir(error)
  //     );
  // }


}
