import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutBootstrapComponent } from './auth/auth-layout-bootstrap/auth-layout-bootstrap.component';

const routes: Routes = [
    { 
      path: '', 
      pathMatch: 'full', 
      redirectTo: 'rpgs' 
    },
    { 
      path: 'login', 
      component: AuthLayoutBootstrapComponent 
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}