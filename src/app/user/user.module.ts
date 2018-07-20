import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserService } from './user.service';
import { PlayerComponent } from './player/player.component';
import { PlayerModalComponent } from './player-modal/player-modal.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  entryComponents: [
    PlayerModalComponent,
  ],
  declarations: [
    PlayerComponent,
    PlayerModalComponent
  ],
  exports: [ 
    PlayerComponent 
  ],
  providers: [
    UserService,
  ]
})
export class UserModule { }
