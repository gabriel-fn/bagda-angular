import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { PlayerService } from './../../player.service';
import { HttpSuccessResponse, Player } from '../../../shared/interfaces';
import { HelperService } from '../../../shared/helper.service';

@Component({
  selector: 'eth-player-delete-button',
  templateUrl: './player-delete-button.component.html',
  styleUrls: ['./player-delete-button.component.css']
})
export class PlayerDeleteButtonComponent implements OnInit {

  @Input('player') player: Player;
  @Output('delete') delete = new EventEmitter<boolean>();

  constructor(private playerService: PlayerService,
              public helperService: HelperService) { }

  ngOnInit(): void {
  }

  deletePlayer() {
    let player: Player = this.player;
    if (this.playerService.editPlayerValidate(player)) {
      this.helperService.openConfirm('Tem certeza que quer apagar este jogador?')
      .subscribe((result) => {
        if (result) {
          this.helperService.showLoading();
          this.playerService.delete(player.id)
          .subscribe(
            (response: HttpSuccessResponse) => {
              this.helperService.showResponse(response);
              this.delete.emit(true);
              this.helperService.hideLoading();
            },
            (error: HttpErrorResponse) => {
              this.helperService.hideLoading();
            }
          );
        }
      });
    }
  }

}
