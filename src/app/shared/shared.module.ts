import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {  MatTableModule, MatSortModule, MatPaginatorModule, 
          MatButtonModule, MatInputModule, MatFormFieldModule, 
          MatCardModule, MatSelectModule, MatExpansionModule, MatListModule } from '@angular/material';

import { ValidateInterceptor } from './interceptors/validate.interceptor';

@NgModule({
  imports: [
    CommonModule,
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
  ],
  declarations: [],
  exports: [
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
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ValidateInterceptor, multi: true},
  ]
})
export class SharedModule { }
