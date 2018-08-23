import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShopComponent } from './shop/shop.component';
import { ShopService } from './shop.service';
import { ItemModalComponent } from './shop/item-modal/item-modal.component';
import { SharedModule } from '../shared/shared.module';
import { ItemEditModalComponent } from './item-control/item-edit-button/item-edit-modal/item-edit-modal.component';
import { ShopControlComponent } from './shop-control/shop-control.component';
import { ItemCreateModalComponent } from './item-control/item-create-button/item-create-modal/item-create-modal.component';
import { ItemCreateButtonComponent } from './item-control/item-create-button/item-create-button.component';
import { ItemEditButtonComponent } from './item-control/item-edit-button/item-edit-button.component';
import { ItemDeleteButtonComponent } from './item-control/item-delete-button/item-delete-button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  entryComponents: [
    ItemModalComponent,
    ItemEditModalComponent,
    ItemCreateModalComponent
  ],
  declarations: [
    ShopComponent,
    ItemModalComponent,
    ItemEditModalComponent,
    ShopControlComponent,
    ItemCreateModalComponent,
    ItemCreateButtonComponent,
    ItemEditButtonComponent,
    ItemDeleteButtonComponent
  ],
  exports: [ 
    ShopComponent,
    ShopControlComponent
  ],
  providers: [
    ShopService
  ]
})
export class ShopModule { }
