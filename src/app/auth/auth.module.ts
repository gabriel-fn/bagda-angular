import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';

import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './register/register.component';
import { AuthLayoutBootstrapComponent } from './auth-layout-bootstrap/auth-layout-bootstrap.component';
import { LoginMaterialComponent } from './login-material/login-material.component';
import { RegisterMaterialComponent } from './register-material/register-material.component';
import { AuthLayoutMaterialComponent } from './auth-layout-material/auth-layout-material.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginMaterialComponent,
    RegisterMaterialComponent,
    AuthLayoutBootstrapComponent,
    AuthLayoutMaterialComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    LoginMaterialComponent,
    RegisterMaterialComponent,
    AuthLayoutBootstrapComponent,
    AuthLayoutMaterialComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    AuthGuard
  ]
})
export class AuthModule { }
