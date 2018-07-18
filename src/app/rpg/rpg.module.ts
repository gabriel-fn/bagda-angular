import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RpgRoutingModule } from './rpg-routing.module';
import { RpgComponent } from './rpg/rpg.component';
import { RpgService } from './rpg.service';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RpgRoutingModule
  ],
  declarations: [RpgComponent],
  exports: [RpgComponent],
  providers: [RpgService]
})
export class RpgModule { }
