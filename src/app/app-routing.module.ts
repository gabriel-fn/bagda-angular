import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutMaterialComponent } from './auth/auth-layout-material/auth-layout-material.component';

const routes: Routes = [
    { 
      path: '', 
      pathMatch: 'full', 
      redirectTo: 'rpgs' 
    },
    { 
      path: 'login', 
      component: AuthLayoutMaterialComponent
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}