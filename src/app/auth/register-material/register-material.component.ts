import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { HelperService } from '../../shared/helper.service';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';
import { HttpSuccessResponse } from '../../shared/interfaces';

@Component({
  selector: 'eth-register-material',
  templateUrl: './register-material.component.html',
  //styleUrls: ['./register-material.component.css']
})
export class RegisterMaterialComponent implements OnInit {
  
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
      (response: HttpSuccessResponse) => {
        this.helperService.showResponse(response);
        this.helperService.hideLoading();
      },
      (error: HttpErrorResponse) => {
        this.helperService.hideLoading();
      }
    );
  }
}
