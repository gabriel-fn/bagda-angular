import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report/report.component';
import { ReportService } from './report.service';

@NgModule({
  imports: [
    CommonModule,
    ReportRoutingModule
  ],
  declarations: [ReportComponent],
  providers: [ReportService]
})
export class ReportModule { }
