import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { RpgService } from '../rpg.service';
import { HelperService } from '../../shared/helper.service';
import { HttpSuccessResponse } from '../../shared/interfaces';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';

@Component({
  selector: 'eth-rpg-create-form',
  templateUrl: './rpg-create-form.component.html',
  styleUrls: ['./rpg-create-form.component.css']
})
export class RpgCreateFormComponent implements OnInit {

  public form: FormGroup;

  constructor(  private rpgService: RpgService,
                private helperService: HelperService,
                private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [ null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
      ] ],
      gold_starter: [ null, [ 
        Validators.required,
        Validators.min(0) 
      ] ],
      cash_starter: [ null, [ 
        Validators.required,
        Validators.min(0) 
      ] ],
      is_public: [ null, [ Validators.required ] ],
    });
  }

  isFieldInvalid(field: string) {
    return this.form.get(field).invalid;
  }

  createRpg() {
    if (this.form.valid) {
      this.helperService.showLoading();
      this.rpgService.create(this.form.value)
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

}
