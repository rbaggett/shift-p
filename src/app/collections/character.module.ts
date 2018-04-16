import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";

import {CharacterComponent} from './character.component';
import {PetsComponent} from './pets/pets.component';
import {MaterialModule} from '../shared/material.module';
import {MountsComponent} from './mounts/mounts.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    CharacterComponent,
    PetsComponent,
    MountsComponent
  ]
})
export class CharacterModule {}
