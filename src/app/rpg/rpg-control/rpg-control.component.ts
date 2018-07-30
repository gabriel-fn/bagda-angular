import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Rpg } from '../../shared/interfaces';
import { RpgService } from '../rpg.service';

@Component({
  selector: 'eth-rpg-control',
  templateUrl: './rpg-control.component.html',
  styleUrls: ['./rpg-control.component.css']
})
export class RpgControlComponent implements OnInit {

  public rpgId: number; 
  public rpg: Rpg;

  get playersWithRequests() {
    return this.rpg.players.filter((player) => player.requests.length);
  }

  get waitPlayers() {
    return this.rpg.players.filter((player) => player.credential == 0);
  }

  get normalPlayers()  {
    return this.rpg.players.filter((player) => player.credential == 1);
  }

  get moderatorPlayers()  {
    return this.rpg.players.filter((player) => player.credential == 2);
  }

  get subMasterPlayers()  {
    return this.rpg.players.filter((player) => player.credential == 3);
  }

  private rpgInPainelSubscription: Subscription;
  private routeSubscription: Subscription;

  constructor(private rpgService: RpgService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.rpgInPainelSubscription = this.rpgService.seeRpgInPainel
    .subscribe((rpg: Rpg) => this.rpg = rpg);

    this.routeSubscription = this.route.params
    .subscribe((params: any) => this.rpgId = params['idRpg']);
  }
    
  ngOnDestroy(): void {
    this.rpgInPainelSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

}
