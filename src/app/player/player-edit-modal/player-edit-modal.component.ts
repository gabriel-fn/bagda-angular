import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Player } from '../../shared/interfaces';
import { HelperService } from '../../shared/helper.service';

@Component({
  selector: 'eth-player-edit-modal',
  templateUrl: './player-edit-modal.component.html',
  styleUrls: ['./player-edit-modal.component.css']
})
export class PlayerEditModalComponent implements OnInit {

  @Input() player: Player;

  constructor(public helperService: HelperService,
              public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
