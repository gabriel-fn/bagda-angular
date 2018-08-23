import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MatDialog } from '@angular/material';

import { Player } from '../../../shared/interfaces';
import { PlayerEditModalComponent } from './player-edit-modal/player-edit-modal.component';
import { HelperService } from '../../../shared/helper.service';

@Component({
  selector: 'eth-player-edit-button',
  templateUrl: './player-edit-button.component.html',
  //styleUrls: ['./player-edit-button.component.css']
})
export class PlayerEditButtonComponent implements OnInit {

  @Input() player: Player;
  @Output() modalClose = new EventEmitter<boolean>();

  constructor(public helperService: HelperService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  open() {
    const dialogRef = this.dialog.open(PlayerEditModalComponent, {
      width: '1000px',
      data: {player: this.player}
    });
    dialogRef.beforeClose().subscribe(result => {
      this.modalClose.emit(true);
    });
  }

}
