import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserRoutingModule } from './user-routing.module';
import { UserService } from './user.service';
import { PlayerComponent } from './player/player.component';
import { PlayerModalComponent } from './player-modal/player-modal.component';
import { PlayerPainelComponent } from './player-painel/player-painel.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    UserRoutingModule
  ],
  entryComponents: [
    PlayerModalComponent,
  ],
  declarations: [
    PlayerComponent,
    PlayerModalComponent,
    PlayerPainelComponent
  ],
  exports: [ 
    PlayerComponent,
    PlayerPainelComponent
  ],
  providers: [
    UserService,
  ]
})
export class UserModule { }
