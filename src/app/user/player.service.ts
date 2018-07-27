import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Item, Token, Rpg } from '../shared/interfaces';
import { HelperService } from '../shared/helper.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class PlayerService {

  private baseUrl: string;
  private token: Token;

  constructor(private helperService: HelperService,
              private authService: AuthService,
              private http: HttpClient) { 
    console.log('player service active'); 
    this.baseUrl = this.helperService.baseUrl;
    this.authService.seeAuthUser.subscribe((token: Token) => this.token = token);
  }

  discardItem(playerId: number, itemId: number): Observable<{error: boolean, message: string}> {
    return this.http.put<{error: boolean, message: string}>(`${this.baseUrl}/api/rpgs/items/discard`, {player_id: playerId, item_id: itemId});
  }

  dismissRequest(playerId: number, itemId: number): Observable<{error: boolean, message: string}> {
    return this.http.put<{error: boolean, message: string}>(`${this.baseUrl}/api/rpgs/requests/dismiss`, {player_id: playerId, item_id: itemId});
  }

  ItemOrRequestValidate(item: Item, rpg: Rpg): boolean {
    return (this.helperService.idValidate(item.process.player_id)
      && this.helperService.idValidate(item.process.item_id)
      && this.helperService.tokenValidate(this.token) 
      && this.helperService.credentialValidate(rpg));
  }

}
