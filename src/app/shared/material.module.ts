import {NgModule} from '@angular/core';
import {MatButtonModule, MatFormFieldModule, MatSelectModule} from '@angular/material';


@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: []
})
export class MaterialModule {}
