import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '../../../node_modules/@angular/common/http';
import { ValidateInterceptor } from './interceptors/validate.interceptor';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ValidateInterceptor, multi: true},
  ]
})
export class SharedModule { }
