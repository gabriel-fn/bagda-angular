import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report/report.component';
import { ReportService } from './report.service';
import { ReportModalComponent } from './report-modal/report-modal.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    ReportRoutingModule
  ],
  entryComponents: [
    ReportModalComponent
  ],
  declarations: [
    ReportComponent, 
    ReportModalComponent
  ],
  exports: [
    ReportComponent
  ],
  providers: [
    ReportService
  ]
})
export class ReportModule { }
