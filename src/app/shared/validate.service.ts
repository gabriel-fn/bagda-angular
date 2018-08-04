import { Injectable } from '@angular/core';

import { Token, Rpg, Item, Player } from './interfaces';
import { HelperService } from './helper.service';
import { AuthService } from '../auth/auth.service';
import { RpgService } from '../rpg/rpg.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  private _token: Token;
  private rpg: Rpg;

  constructor(private helperService: HelperService,
              private rpgService: RpgService,
              private authService: AuthService) {
    this.authService.seeAuthUser.subscribe((token: Token) => this._token = token);
    this.rpgService.seeRpgInPainel.subscribe((rpg: Rpg) => this.rpg = rpg);
  }

  showInvalidData(errors: any) {
    for (let error in errors) {
      for (let message of errors[error]){
        this.helperService.showError(message);
      }
    }
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

  moderator(rpg: Rpg = this.rpg): boolean {
    if (rpg.player && rpg.player.credential > 1) {
      return true;
    }
    this.helperService.showError('Você deve ser moderador do rpg para realizar está ação!');
    return false;
  }

  master(rpg: Rpg = this.rpg): boolean {
    if (rpg.player && rpg.player.credential > 2) {
      return true;
    }
    this.helperService.showError('Você deve ser mestre/mestre auxiliar do rpg para realizar está ação!');
    return false;
  }

  credential(rpg: Rpg = this.rpg): boolean {
    if (rpg.player && rpg.player.credential > 0) {
      return true;
    }
    this.helperService.showError('Você deve estar participando do rpg para realizar está ação!');
    return false;
  }

  canTouchPlayer(credential: number, rpg: Rpg = this.rpg) {
    if (rpg.player && (rpg.player.credential == 4 || (rpg.player.credential > 1 && rpg.player.credential > credential))) {
      return true;
    }
    this.helperService.showError('Você deve ser moderador do rpg e estar acima do jogador para poder mexer nas coisas dele!');
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
