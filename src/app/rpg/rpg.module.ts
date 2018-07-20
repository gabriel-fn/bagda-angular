import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RpgRoutingModule } from './rpg-routing.module';
import { RpgComponent } from './rpg/rpg.component';
import { RpgService } from './rpg.service';
import { RpgPainelComponent } from './rpg-painel/rpg-painel.component';
import { RpgGuard } from './guards/rpg.guard';
import { ShopModule } from '../shop/shop.module';
import { UserModule } from '../user/user.module';

@NgModule({
  imports: [
    CommonModule,
    ShopModule,
    UserModule,
    NgbModule,
    RpgRoutingModule
  ],
  declarations: [
    RpgComponent, 
    RpgPainelComponent
  ],
  exports: [
    RpgComponent
  ],
  providers: [
    RpgService, 
    RpgGuard
  ]
})
export class RpgModule { }
