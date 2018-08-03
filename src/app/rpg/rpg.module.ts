import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RpgRoutingModule } from './rpg-routing.module';
import { RpgComponent } from './rpg/rpg.component';
import { RpgService } from './rpg.service';
import { RpgPainelComponent } from './rpg-painel/rpg-painel.component';
import { RpgGuard } from './guards/rpg.guard';
import { ShopModule } from '../shop/shop.module';
import { PlayerModule } from '../player/player.module';
import { RpgControlComponent } from './rpg-control/rpg-control.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ShopModule,
    PlayerModule,
    SharedModule,
    NgbModule,
    RpgRoutingModule
  ],
  declarations: [
    RpgComponent, 
    RpgPainelComponent, 
    RpgControlComponent,
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
