import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Token } from '../../shared/interfaces';
import { AuthService } from './../auth.service';
import { HelperService } from '../../shared/helper.service';

@Component({
  selector: 'eth-login-material',
  templateUrl: './login-material.component.html',
  styleUrls: ['./login-material.component.css']
})
export class LoginMaterialComponent implements OnInit {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private helperService: HelperService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [ null, [
        Validators.required,
        Validators.email,
      ] ],
      password: [ null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ] ],
    });
  }

  isFieldInvalid(field: string) {
    return (
      (this.form.get(field).invalid && this.form.get(field).touched)
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      alert('Formulário Invalido! Verifique se os campos estão preenchidos corretamente.');
    } else {
      this.authenticate(this.form.value['email'], this.form.value['password']);
    }
  }

  authenticate(email, password) {
    this.helperService.showLoading();
    this.authService.authenticate(email, password)
    .subscribe(
      (token: Token) => {
        console.log(token);
        this.authService.setToken(token);
        this.authService.authUser.next(token);
        this.router.navigate(['rpgs/user']);
        this.helperService.hideLoading();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status == 401) {
          this.helperService.showError('As credenciais do usuário estão incorretas!');
        }
        this.helperService.hideLoading();
      }
    );
  }

}
