import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CharacterComponent} from './collections/character.component';
import {CharacterResolver} from './shared/resolves';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: ':region/:realm/:character',
    component: CharacterComponent,
    resolve: {data: CharacterResolver}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

