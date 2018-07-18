import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './../auth.service';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder,
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
    this.authService.authenticate(email, password)
    .subscribe(
      (token) => {
        console.log(token);
        this.authService.authUser.next(token);
        this.router.navigate(['rpgs']);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

}
