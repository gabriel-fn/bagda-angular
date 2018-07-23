import { Component, OnInit, Input } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { Rpg, Player } from '../../shared/interfaces';
import { PlayerModalComponent } from '../player-modal/player-modal.component';
import { HelperService } from '../../shared/helper.service';
import { RpgService } from '../../rpg/rpg.service';

@Component({
  selector: 'eth-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  @Input() rpg: Rpg; 

  private rpgInPainelSubscription: Subscription;

  constructor(private rpgService: RpgService,
              public helperService: HelperService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.rpgInPainelSubscription = this.rpgService.seeRpgInPainel.subscribe(
      (rpg: Rpg) => {
        this.rpg = rpg;
      }
    );
  }

  open(player: Player) {
    const modalRef = this.modalService.open(
      PlayerModalComponent, {
        size: 'lg',
        centered: true
      }
    );
    modalRef.componentInstance.player = player;
  }

  ngOnDestroy(): void {
    this.rpgInPainelSubscription.unsubscribe();
  }

}
