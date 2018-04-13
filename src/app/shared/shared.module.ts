import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BnetService, CharacterService} from './services';
import {CharacterResolver, DataResolver} from './resolves';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    BnetService,
    CharacterResolver,
    CharacterService,
    DataResolver
  ]
})
export class SharedModule {
}
