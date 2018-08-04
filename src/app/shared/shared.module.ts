import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {  MatTableModule, MatSortModule, MatPaginatorModule, 
          MatButtonModule, MatInputModule, MatFormFieldModule, 
          MatCardModule, MatSelectModule, MatExpansionModule, MatListModule, MatDialogModule } from '@angular/material';

import { ValidateInterceptor } from './interceptors/validate.interceptor';
import { NgbModule } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';

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
  ],
  declarations: [],
  exports: [
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
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ValidateInterceptor, multi: true},
  ]
})
export class SharedModule { }
