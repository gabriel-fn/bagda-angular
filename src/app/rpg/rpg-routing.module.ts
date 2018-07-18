import { AuthGuard } from './../auth/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RpgComponent } from './rpg/rpg.component';
import { RpgPainelComponent } from './rpg-painel/rpg-painel.component';
import { RpgGuard } from './guards/rpg.guard';

const routes: Routes = [
  { 
    path: 'rpgs', 
    component: RpgComponent 
  },
  { 
    path: 'rpgs/user', 
    component:  RpgComponent, 
    canActivate: [AuthGuard], 
    canLoad: [AuthGuard]
  },
  { 
    path: 'rpgs/:id', 
    component: RpgPainelComponent, 
    canActivate: [RpgGuard], 
    canLoad: [RpgGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RpgRoutingModule { }
