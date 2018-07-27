import { Injectable } from '@angular/core';

import { Token, Rpg, Item, Player } from './interfaces';
import { HelperService } from './helper.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  private _token: Token;

  constructor(private helperService: HelperService,
              private authService: AuthService) {
    this.authService.seeAuthUser.subscribe((token: Token) => this._token = token);
  }

  token(): boolean {
    if (!this._token) {
      this.helperService.showError('O usuário deve estar logado para realizar esta ação.');
      return false;
    }
    return true;
  }

  id(id: number): boolean {
    if (!(id > 0)) {
      this.helperService.showError('A solicitado é invalida!');
      return false;
    }
    return true;
  }

  credential(rpg: Rpg): boolean {
    if (rpg.player && rpg.player.credential > 0) {
      return true;
    }
    this.helperService.showError('Você deve estar participando do rpg para realizar está ação!');
    return false;
  }

  itemLimite(item: Item): boolean {
    let total_units: number = item.players.reduce((total, player) => total += player.process.units, 0);
    if (item.max_units && total_units >= item.max_units) {
      this.helperService.showError('Este item já alcançou seu limite de usuários!');
      return false
    }
    return true;
  }

  itemPay(item: Item, player: Player): boolean {
    if ((player.gold < item.gold_price) || (player.cash < item.cash_price)) {
      this.helperService.showError('Você não tem gold ou cash o suficiente para arcar com os custos deste item!');
      return false
    }
    return true;
  }
}
