import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CharacterComponent} from './collections/character.component';
import {CharacterResolver} from './shared/resolves';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from "./core/not-found/not-found.component";

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
  },
  {
    path: 'character-not-found',
    component: NotFoundComponent,
    data: {source: 'Character'}
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}



