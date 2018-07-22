import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Player } from '../../shared/interfaces';

@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.component.html',
  styleUrls: ['./player-modal.component.css']
})
export class PlayerModalComponent implements OnInit {

  @Input() player: Player;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
