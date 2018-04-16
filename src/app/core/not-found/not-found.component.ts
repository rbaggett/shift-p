import {ActivatedRoute} from "@angular/router";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  public source: string;

  // ---------------------------------------------------
  // INITIALIZE
  // ---------------------------------------------------

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.subscription = this.route
      .data.subscribe(data => this.source = data.source);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  // ---------------------------------------------------
  // FUNCTIONS
  // ---------------------------------------------------


}
