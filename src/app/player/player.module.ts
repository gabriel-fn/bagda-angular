import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PlayerComponent } from './player/player.component';
import { PlayerModalComponent } from './player-modal/player-modal.component';
import { PlayerPainelComponent } from './player-painel/player-painel.component';
import { PlayerService } from './player.service';

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
    PlayerPainelComponent
  ],
  exports: [ 
    PlayerComponent,
    PlayerPainelComponent
  ],
  providers: [
    PlayerService,
  ]
})
export class PlayerModule { }
