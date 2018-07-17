import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'reports' },
    { path: 'reports', loadChildren: './report/report.module#ReportModule' },
    { path: 'rpgs', loadChildren: './rpg/rpg.module#RpgModule' },
    { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}