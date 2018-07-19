import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop/shop.component';
import { ShopService } from './shop.service';

@NgModule({
  imports: [
    CommonModule,
    ShopRoutingModule
  ],
  declarations: [
    ShopComponent
  ],
  providers: [
    ShopService
  ]
})
export class ShopModule { }
