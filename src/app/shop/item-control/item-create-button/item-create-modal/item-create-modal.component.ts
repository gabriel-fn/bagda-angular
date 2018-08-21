import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Rpg, HttpSuccessResponse } from '../../../../shared/interfaces';
import { HelperService } from '../../../../shared/helper.service';
import { ShopService } from '../../../shop.service';

@Component({
  selector: 'eth-item-create-modal',
  templateUrl: './item-create-modal.component.html',
  styleUrls: ['./item-create-modal.component.css']
})
export class ItemCreateModalComponent implements OnInit {

  public rpg: Rpg;
  public form: FormGroup;

  constructor(public helperService: HelperService,
              private shopService: ShopService,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<ItemCreateModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {rpg: Rpg}) { }

  ngOnInit() {
    this.rpg = this.data.rpg;
    this.form = this.formBuilder.group({
      shop_id: [ null, [ Validators.required ] ],
      name: [ null, [ 
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(25), 
      ] ],
      gold_price: [ null, [ 
        Validators.required,
        Validators.min(0) 
      ] ],
      cash_price: [ null, [ 
        Validators.required,
        Validators.min(0) 
      ] ],
      max_units: [ null, [ 
        Validators.required,
        Validators.min(0) 
      ] ],
      require_test: [ null, [ 
        Validators.required 
      ] ],
      detail: [ '', [ 
        Validators.max(5000) 
      ] ],
    });
  }

  isFieldInvalid(field: string) {
    return this.form.get(field).invalid;
  }

  createItem() {
    if (this.form.valid && this.shopService.editShopValidate()) {
      this.helperService.showLoading();
      this.shopService.createItem(this.form.value)
      .subscribe(
        (response: HttpSuccessResponse) => {
          this.helperService.showResponse(response);
          this.helperService.hideLoading();
          this.form.reset();
        },
        (error: HttpErrorResponse) => {
          this.helperService.hideLoading();
        }
      );
    }
  }

}
