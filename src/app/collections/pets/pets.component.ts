import {Component, OnInit} from '@angular/core';

import {CharacterService} from "../../shared/services";
import {MergedPet} from "../../shared/models";

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {

  public pets: MergedPet[];

  constructor(
    private characterService: CharacterService
  ) {
  }

  ngOnInit() {
    this.pets = this.characterService.mergedPets;
  }

}
