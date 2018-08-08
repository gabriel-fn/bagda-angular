import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { HelperService } from '../../shared/helper.service';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';

@Component({
  selector: 'eth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private helperService: HelperService,
              private authService: AuthService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [ null, [ 
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(25), 
      ] ],
      email: [ null, [
        Validators.required,
        Validators.email,
      ] ],
      password: [ null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ] ],
      password_confirmation: [ null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),        
      ] ]
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
      this.register(this.form.value);
    }
  }

  register(values) {
    this.helperService.showLoading();
    this.authService.register(values)
    .subscribe(
      (res) => {
        console.log(res);
        this.helperService.hideLoading();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.helperService.hideLoading();
      }
    );
  }
}
