import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ShopComponent } from './shop/shop.component';
import { ShopService } from './shop.service';
import { ItemModalComponent } from './item-modal/item-modal.component';
import { ShopControlComponent } from './shop-control/shop-control.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  entryComponents: [
    ItemModalComponent
  ],
  declarations: [
    ShopComponent,
    ItemModalComponent,
    ShopControlComponent
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
