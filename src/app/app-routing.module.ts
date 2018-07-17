import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'reports' },
    { path: 'reports', loadChildren: './report/report.module#ReportModule' },
    { path: 'rpgs', loadChildren: './rpg/rpg.module#RpgModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}