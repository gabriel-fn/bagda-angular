import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { User, HttpSuccessResponse } from '../../shared/interfaces';
import { HelperService } from '../../shared/helper.service';
import { UserService } from '../user.service';

@Component({
  selector: 'eth-user-painel',
  templateUrl: './user-painel.component.html',
  styleUrls: ['./user-painel.component.css']
})
export class UserPainelComponent implements OnInit {

  user: User;
  form: FormGroup;

  constructor(  private userService: UserService, 
                private formBuilder: FormBuilder,
                public helperService: HelperService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
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

    this.helperService.showLoading();
    this.userService.getUser()
    .subscribe(
      (user: User) => {
        this.user = user;
        this.helperService.hideLoading();
      },
      (error: HttpErrorResponse) => {
        this.helperService.hideLoading();
      }
    );
  }

  isFieldInvalid(field: string) {
    return this.form.get(field).invalid;
  }

  onSubmit() {
    if (this.form.invalid) {
      alert('Formulário Invalido! Verifique se os campos estão preenchidos corretamente.');
    } else {
      this.resetPassword(this.form.value);
    }
  }

  resetPassword(values) {
    this.helperService.showLoading();
    this.userService.resetPassword(values)
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
