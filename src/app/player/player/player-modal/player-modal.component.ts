import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material';

import { Player } from '../../../shared/interfaces';
import { HelperService } from '../../../shared/helper.service';

@Component({
  selector: 'eth-player-modal',
  templateUrl: './player-modal.component.html',
  //styleUrls: ['./player-modal.component.css']
})
export class PlayerModalComponent implements OnInit {

  public player: Player;

  constructor(public helperService: HelperService,
              @Inject(MAT_DIALOG_DATA) public data: {player: Player}) { }

  ngOnInit() {
    this.player = this.data.player;
  }

}
