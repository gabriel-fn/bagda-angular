import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  baseUrl: string = 'http://localhost:8000';

  constructor() { }

  status(credential: number): string {
    let credentialNames = ['Pedido Pendente', 'Jogador', 'Moderador', 'Mestre Auxiliar', 'Mestre'];
    return credentialNames[credential];
  }

}
