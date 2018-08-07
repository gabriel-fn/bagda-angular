import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { HelperService } from '../../shared/helper.service';
import { Item, HttpSuccessResponse } from '../../shared/interfaces';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-item-edit-modal',
  templateUrl: './item-edit-modal.component.html',
  styleUrls: ['./item-edit-modal.component.css']
})
export class ItemEditModalComponent implements OnInit {

  public item: Item;
  public form: FormGroup;
  @ViewChild('imageItem') imageItem: ElementRef; 

  constructor(public helperService: HelperService,
              private shopService: ShopService,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<ItemEditModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {item: Item}) { }

  ngOnInit(): void {
    this.item = this.data.item;
    this.form = this.formBuilder.group({
      item_id: [ this.item.id, [ Validators.required ] ],
      name: [ this.item.name, [ 
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25), 
      ] ],
      gold_price: [ this.item.gold_price, [ 
        Validators.required,
        Validators.min(0) 
      ] ],
      cash_price: [ this.item.cash_price, [ 
        Validators.required,
        Validators.min(0) 
      ] ],
      max_units: [ this.item.max_units, [ 
        Validators.required,
        Validators.min(0) 
      ] ],
      require_test: [ this.item.require_test, [ 
        Validators.required 
      ] ],
      detail: [ this.item.detail, [ 
        Validators.max(5000) 
      ] ],
      image: [ null ]
    });
  }

  isFieldInvalid(field: string) {
    return this.form.get(field).invalid;
  }

  handleFileInput(files: FileList) {
    if (files && files.length > 0) {
      this.form.get('image').setValue(files.item(0));
    }
  }

  clearFileInput() {
    this.form.get('image').setValue(null);
    this.imageItem.nativeElement.value = null;
  }

  updateItem() {
    if (this.form.valid && this.shopService.editShopValidate()) {
      this.helperService.showLoading();
      this.shopService.updateItem(this.form.value)
      .subscribe(
        (response: HttpSuccessResponse) => {
          this.helperService.showResponse(response);
          this.helperService.hideLoading();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.helperService.hideLoading();
        }
      );
      this.clearFileInput();
    }
  }

}
