import { Component, OnInit } from '@angular/core';

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

  public rpg: Rpg; 
  public filter: string;

  private rpgInPainelSubscription: Subscription;

  constructor(private rpgService: RpgService,
              public helperService: HelperService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.rpgInPainelSubscription = this.rpgService.seeRpgInPainel
    .subscribe((rpg: Rpg) => this.rpg = rpg);
  }

  get players(): Player[] {
    if (this.filter && this.filter.trim() != '') {
      return this.rpg.players.filter((player) => {
        return (player.user.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1);
      })
    }
    return this.rpg.players;
  }

  applyFilter(value) {
    this.filter = value;
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
