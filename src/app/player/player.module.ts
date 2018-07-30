import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PlayerComponent } from './player/player.component';
import { PlayerModalComponent } from './player-modal/player-modal.component';
import { PlayerPainelComponent } from './player-painel/player-painel.component';
import { PlayerService } from './player.service';
import { PlayerControlComponent } from './player-control/player-control.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
  ],
  entryComponents: [
    PlayerModalComponent,
  ],
  declarations: [
    PlayerComponent,
    PlayerModalComponent,
    PlayerPainelComponent,
    PlayerControlComponent
  ],
  exports: [ 
    PlayerComponent,
    PlayerPainelComponent,
    PlayerControlComponent
  ],
  providers: [
    PlayerService,
  ]
})
export class PlayerModule { }
