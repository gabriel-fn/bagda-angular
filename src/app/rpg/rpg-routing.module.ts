import { AuthGuard } from './../auth/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RpgComponent } from './rpg/rpg.component';
import { MyRpgComponent } from './my-rpg/my-rpg.component';

const routes: Routes = [
  { path: 'rpgs', component: RpgComponent },
  { path: 'rpgs/my', component:  MyRpgComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RpgRoutingModule { }
