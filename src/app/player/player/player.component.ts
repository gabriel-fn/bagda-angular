import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';

import { Rpg, Player } from '../../shared/interfaces';
import { PlayerModalComponent } from './player-modal/player-modal.component';
import { HelperService } from '../../shared/helper.service';
import { RpgService } from '../../rpg/rpg.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'eth-player',
  templateUrl: './player.component.html',
  //styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  public rpgId: number; 
  public rpg: Rpg; 
  public filter: string;

  private rpgInPainelSubscription: Subscription;
  private routeSubscription: Subscription;

  constructor(private rpgService: RpgService,
              public helperService: HelperService,
              public dialog: MatDialog,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.rpgInPainelSubscription = this.rpgService.seeRpgInPainel
    .subscribe((rpg: Rpg) => this.rpg = rpg);

    this.routeSubscription = this.route.params
    .subscribe((params: any) => this.rpgId = params['idRpg']);
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
    this.dialog.open(PlayerModalComponent, {
      width: '1000px',
      data: {player: player}
    });
  }

  onModalClose() {
    this.rpgService.rpg(this.rpgId);
  }

  ngOnDestroy(): void {
    this.rpgInPainelSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();  
  }

}
