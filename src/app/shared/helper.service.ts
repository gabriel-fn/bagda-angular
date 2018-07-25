import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Token, Rpg, Item } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  baseUrl: string = 'http://localhost:8000';

  constructor(private toastr: ToastrService) { }

  status(credential: number): string {
    let credentialNames = ['Pedido Pendente', 'Jogador', 'Moderador', 'Mestre Auxiliar', 'Mestre'];
    return credentialNames[credential];
  }

  showError(message: string): void {
    this.toastr.error(message, 'Aviso de erro!');
  }

  showSuccess(message: string): void {
    this.toastr.success(message, 'Resposta:');
  }

  showResponse(response: {error: boolean, message: string}): void {
    if (response.error) {
      this.showError(response.message);
    } else {
      this.showSuccess(response.message);
    }
  }
  
//Validates Helpers
  tokenValidate(token: Token): boolean {
    if (!token) {
      this.toastr.error('O usuário deve estar logado para realizar esta ação.', 'Aviso de erro!');
      return false;
    }
    return true;
  }

  idValidate(id: number): boolean {
    if (!(id > 0)) {
      this.toastr.error('A solicitado é invalida!', 'Aviso de erro!');
      return false;
    }
    return true;
  }

  credentialValidate(rpg: Rpg): boolean {
    if (rpg.player && rpg.player.credential > 0) {
      return true;
    }
    this.toastr.error('Você deve estar participando do rpg para realizar está ação!', 'Aviso de erro!');
    return false;
  }

  itemLimiteValidate(item: Item): boolean {
    let total_units: number = item.players.reduce((total, player) => total += player.process.units, 0);
    if (item.max_units && total_units >= item.max_units) {
      this.toastr.error('Este item já alcançou seu limite de usuários!', 'Aviso de erro!');
      return false
    }
    return true;
  }

  itemPayValidate(item: Item, rpg: Rpg): boolean {
    if ((rpg.player.gold < item.gold_price) || (rpg.player.cash < item.cash_price)) {
      this.toastr.error('Você não tem gold ou cash o suficiente para arcar com os custos deste item!', 'Aviso de erro!');
      return false
    }
    return true;
  }

}
