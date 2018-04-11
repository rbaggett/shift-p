import {NgModule} from '@angular/core';
import {
  MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatSelectModule,
  MatToolbarModule
} from '@angular/material';


@NgModule({
  imports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule
  ],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule
  ],
  providers: []
})
export class MaterialModule {}
