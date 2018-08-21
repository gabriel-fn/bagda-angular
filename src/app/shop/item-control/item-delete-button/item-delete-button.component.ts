import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { HttpSuccessResponse, Item } from '../../../shared/interfaces';
import { ShopService } from './../../shop.service';
import { HelperService } from '../../../shared/helper.service';

@Component({
  selector: 'eth-item-delete-button',
  templateUrl: './item-delete-button.component.html',
  styleUrls: ['./item-delete-button.component.css']
})
export class ItemDeleteButtonComponent implements OnInit {

  @Input('item') item: Item;
  @Output('delete') delete = new EventEmitter<boolean>();

  constructor(private shopService: ShopService,
              public helperService: HelperService) { }

  ngOnInit(): void {
  }

  deleteItem() {
    let itemId = this.item.id;
    if (this.shopService.editShopValidate()) {
      this.helperService.openConfirm('Tem certeza que quer apagar este item?')
      .subscribe((result) => {
        if (result) { 
          this.helperService.showLoading();
          this.shopService.deleteItem(itemId)
          .subscribe(
            (response: HttpSuccessResponse) => {
              this.helperService.showResponse(response);
              this.delete.emit(true);
              this.helperService.hideLoading();
            },
            (error: HttpErrorResponse) => {
              this.helperService.hideLoading();
            }
          );
        }
      });
    }
  }

}
