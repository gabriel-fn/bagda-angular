import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RpgComponent } from './rpg/rpg.component';

const routes: Routes = [
  { path: 'rpgs', component: RpgComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RpgRoutingModule { }
