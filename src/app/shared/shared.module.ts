import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {  MatTableModule, MatSortModule, MatPaginatorModule, 
          MatButtonModule, MatInputModule, MatFormFieldModule, 
          MatCardModule, MatSelectModule, MatExpansionModule, MatListModule, MatDialogModule, MatProgressBarModule } from '@angular/material';

import { ValidateInterceptor } from './interceptors/validate.interceptor';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatDialogModule,
    MatProgressBarModule,
  ],
  declarations: [LoaderComponent],
  exports: [
    LoaderComponent,
    NgbModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatDialogModule,
    MatProgressBarModule,
  ],
  providers: [
    LoaderService,
    {provide: HTTP_INTERCEPTORS, useClass: ValidateInterceptor, multi: true},
  ]
})
export class SharedModule { }
