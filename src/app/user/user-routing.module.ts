import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../auth/guards/auth.guard';
import { UserPainelComponent } from './user-painel/user-painel.component';

const routes: Routes = [
  { 
    path: 'user', 
    component:  UserPainelComponent, 
    canActivate: [ AuthGuard ], 
    canLoad: [ AuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
