import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material";

import * as _ from 'lodash';

import {CharacterService} from "../../shared/services";
import {DetailsComponent} from "./details/details.component";
import {MergedPet} from "../../shared/models";

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {

  private filterPets: MergedPet[];
  private masterPets: MergedPet[];

  public pagePets: MergedPet[];
  public pageSize = 20;
  public currentPage = 0;

  // ---------------------------------------------------
  // INITIALIZE
  // ---------------------------------------------------

  constructor(
    private dialog: MatDialog,
    private characterService: CharacterService
  ) {
  }




  ngOnInit() {
    this.masterPets = this.characterService.mergedPets;
    this.filterPets = _.filter(this.masterPets, {original: true});
    this.pagePets = this.filterPets.slice(this.currentPage, this.pageSize);
  }




  // ---------------------------------------------------
  // FUNCTIONS
  // --------------------------------------------------



  public backTen(): void {
    if (this.currentPage === 0) {
      return;
    }

    this.currentPage = this.currentPage - 1;

    const petStart = this.currentPage * this.pageSize;
    const petEnd = petStart + this.pageSize;
    this.pagePets = this.filterPets.slice(petStart, petEnd);
  }




  public forwardTen(): void {
    if ((this.currentPage + 1) * this.pageSize > this.filterPets.length) {
      return;
    }

    this.currentPage = this.currentPage + 1;

    const petStart = this.currentPage * this.pageSize;
    const petEnd = petStart + this.pageSize;
    this.pagePets = this.filterPets.slice(petStart, petEnd);
  }




  /**
   *
   * @param event
   */
  public mouseScroll(event) {
    (event.wheelDelta > 0) ? this.backTen() : this.forwardTen();
  }




  /**
   *
   * @param {MergedPet} pet
   */
  public openDialog(pet: MergedPet): void {
    let dialogRef = this.dialog.open(DetailsComponent, {data: pet});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
