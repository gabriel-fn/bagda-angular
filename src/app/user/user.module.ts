import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserService } from './user.service';
import { UserPainelComponent } from './user-painel/user-painel.component';
import { SharedModule } from '../shared/shared.module';
import { RpgModule } from '../rpg/rpg.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    RpgModule,
    SharedModule
  ],
  declarations: [ UserPainelComponent ],
  exports: [ UserPainelComponent ],
  providers: [ UserService ]
})
export class UserModule { }
