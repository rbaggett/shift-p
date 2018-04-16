import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';

import {CharacterService} from "../../shared/services";
import {MergedPet} from "../../shared/models";

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {

  public blizzIconUrl = environment.blizzardIcon36;
  public wowHeadUrl = environment.wowHeadUrl;
  public pets: MergedPet[];
  public visiblePets: MergedPet[];

  public pageSize = 20;
  public currentPage = 0;

  // ---------------------------------------------------
  // INITIALIZE
  // ---------------------------------------------------

  constructor(
    private characterService: CharacterService
  ) {
  }




  ngOnInit() {
    this.pets = this.characterService.mergedPets;
    this.visiblePets = this.pets.slice(this.currentPage, this.pageSize);
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
    this.visiblePets = this.pets.slice(petStart, petEnd);
  }




  public forwardTen(): void {
    if ((this.currentPage + 1) * this.pageSize > this.pets.length) {
      return;
    }

    this.currentPage = this.currentPage + 1;

    const petStart = this.currentPage * this.pageSize;
    const petEnd = petStart + this.pageSize;
    this.visiblePets = this.pets.slice(petStart, petEnd);
  }


}
