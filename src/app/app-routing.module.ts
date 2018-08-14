import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutMaterialComponent } from './auth/auth-layout-material/auth-layout-material.component';
import { UserPainelComponent } from './auth/user-painel/user-painel.component';

const routes: Routes = [
    { 
      path: '', 
      pathMatch: 'full', 
      redirectTo: 'rpgs' 
    },
    { 
      path: 'user', 
      component: UserPainelComponent
    },
    { 
      path: 'login', 
      component: AuthLayoutMaterialComponent
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}