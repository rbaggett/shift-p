import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BnetService} from './services';
import {DataResolver} from './resolves';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    BnetService,
    DataResolver
  ]
})
export class SharedModule {
}
