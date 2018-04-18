import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from "../app-routing.module";
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {MaterialModule} from '../shared/material.module';
import {NotFoundComponent} from './not-found/not-found.component';

@NgModule({
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    NotFoundComponent
  ],
  exports: [
    FooterComponent,
    HeaderComponent
  ]
})
export class CoreModule {
}
