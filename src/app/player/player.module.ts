import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PlayerComponent } from './player/player.component';
import { PlayerModalComponent } from './player/player-modal/player-modal.component';
import { PlayerPainelComponent } from './player-painel/player-painel.component';
import { PlayerService } from './player.service';
//import { PlayerControlComponent } from './player-control/player-control.component';
import { PlayerEditModalComponent } from './player-control/player-edit-button/player-edit-modal/player-edit-modal.component';
import { SharedModule } from '../shared/shared.module';
import { PlayerEditButtonComponent } from './player-control/player-edit-button/player-edit-button.component';
import { PlayerDeleteButtonComponent } from './player-control/player-delete-button/player-delete-button.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  entryComponents: [
    PlayerModalComponent,
    PlayerEditModalComponent
  ],
  declarations: [
    PlayerComponent,
    PlayerModalComponent,
    PlayerPainelComponent,
    //PlayerControlComponent,
    PlayerEditModalComponent,
    PlayerEditButtonComponent,
    PlayerDeleteButtonComponent,
  ],
  exports: [ 
    PlayerComponent,
    PlayerPainelComponent,
    //PlayerControlComponent
  ],
  providers: [
    PlayerService,
  ]
})
export class PlayerModule { }
