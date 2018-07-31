import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { PlayerComponent } from './player/player.component';
import { PlayerModalComponent } from './player-modal/player-modal.component';
import { PlayerPainelComponent } from './player-painel/player-painel.component';
import { PlayerService } from './player.service';
import { PlayerControlComponent } from './player-control/player-control.component';
import { PlayerEditModalComponent } from './player-edit-modal/player-edit-modal.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NgbModule,
  ],
  entryComponents: [
    PlayerModalComponent,
    PlayerEditModalComponent
  ],
  declarations: [
    PlayerComponent,
    PlayerModalComponent,
    PlayerPainelComponent,
    PlayerControlComponent,
    PlayerEditModalComponent
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
