import {NgModule} from '@angular/core';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatSelectModule, MatToolbarModule} from '@angular/material';


@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule
  ],
  exports: [
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
