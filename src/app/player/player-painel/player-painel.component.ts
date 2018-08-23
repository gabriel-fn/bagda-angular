import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Subscription } from 'rxjs';

import { Rpg, Item, HttpSuccessResponse } from '../../shared/interfaces';
import { RpgService } from '../../rpg/rpg.service';
import { HelperService } from '../../shared/helper.service';
import { PlayerService } from '../player.service';

@Component({
  selector: 'eth-player-painel',
  templateUrl: './player-painel.component.html',
  //styleUrls: ['./player-painel.component.css']
})
export class PlayerPainelComponent implements OnInit {

  public rpg: Rpg; 
  public rpgId: number; 

  private rpgInPainelSubscription: Subscription;
  private routeSubscription: Subscription;

  constructor(private rpgService: RpgService,
              private playerService: PlayerService,
              public helperService: HelperService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.rpgInPainelSubscription = this.rpgService.seeRpgInPainel
    .subscribe((rpg: Rpg) => this.rpg = rpg);

    this.routeSubscription = this.route.params
    .subscribe((params: any) => this.rpgId = params['idRpg']);
  }

  discardItem(item: Item): void {
    if (this.playerService.ItemOrRequestValidate(item)) {
      this.helperService.openConfirm('Tem certeza que quer descartar este item?')
      .subscribe((result) => {
        if (result) {
          this.helperService.showLoading();
          this.playerService.discardItem(item.process.player_id, item.process.item_id)
          .subscribe(
            (response: HttpSuccessResponse) => {
              this.rpgService.rpg(this.rpgId);
              this.helperService.showResponse(response);
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

  dismissRequest(request: Item): void {
    if (this.playerService.ItemOrRequestValidate(request)) {
      this.helperService.showLoading();
      this.playerService.dismissRequest(request.process.player_id, request.process.item_id)
      .subscribe(
        (response: HttpSuccessResponse) => {
          this.rpgService.rpg(this.rpgId);
          this.helperService.showResponse(response);
          this.helperService.hideLoading();
        },
        (error: HttpErrorResponse) => {
          this.helperService.hideLoading();
        },
      );
    }
  }

  ngOnDestroy(): void {
    this.rpgInPainelSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

}
