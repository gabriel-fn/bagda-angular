import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShopComponent } from './shop/shop.component';
import { ShopService } from './shop.service';
import { ItemModalComponent } from './item-modal/item-modal.component';
import { SharedModule } from '../shared/shared.module';
import { ItemEditModalComponent } from './item-edit-modal/item-edit-modal.component';
import { ItemControlComponent } from './item-control/item-control.component';
import { ShopControlComponent } from './shop-control/shop-control.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  entryComponents: [
    ItemModalComponent,
    ItemEditModalComponent
  ],
  declarations: [
    ShopComponent,
    ItemModalComponent,
    ItemControlComponent,
    ItemEditModalComponent,
    ShopControlComponent
  ],
  exports: [ 
    ShopComponent,
    ItemControlComponent,
    ShopControlComponent
  ],
  providers: [
    ShopService
  ]
})
export class ShopModule { }
