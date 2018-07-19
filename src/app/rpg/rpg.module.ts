import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RpgRoutingModule } from './rpg-routing.module';
import { RpgComponent } from './rpg/rpg.component';
import { RpgService } from './rpg.service';
import { RpgPainelComponent } from './rpg-painel/rpg-painel.component';
import { RpgGuard } from './guards/rpg.guard';
import { ReportModule } from '../report/report.module';
import { ShopModule } from '../shop/shop.module';

@NgModule({
  imports: [
    CommonModule,
    ReportModule,
    ShopModule,
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
