import {NgModule} from '@angular/core';
import {
  MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatSelectModule,
  MatTabsModule,
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
    MatTabsModule,
    MatToolbarModule
  ],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule
  ],
  providers: []
})
export class MaterialModule {}
