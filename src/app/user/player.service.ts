import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Item, Rpg } from '../shared/interfaces';
import { HelperService } from '../shared/helper.service';
import { ValidateService } from '../shared/validate.service';

@Injectable()
export class PlayerService {

  private baseUrl: string;

  constructor(private helperService: HelperService,
              private validateService: ValidateService,
              private http: HttpClient) { 
    console.log('player service active'); 
    this.baseUrl = this.helperService.baseUrl;
  }

  discardItem(playerId: number, itemId: number): Observable<{error: boolean, message: string}> {
    return this.http.put<{error: boolean, message: string}>(`${this.baseUrl}/api/rpgs/items/discard`, {player_id: playerId, item_id: itemId});
  }

  dismissRequest(playerId: number, itemId: number): Observable<{error: boolean, message: string}> {
    return this.http.put<{error: boolean, message: string}>(`${this.baseUrl}/api/rpgs/requests/dismiss`, {player_id: playerId, item_id: itemId});
  }

  ItemOrRequestValidate(item: Item, rpg: Rpg): boolean {
    return (this.validateService.id(item.process.player_id)
      && this.validateService.id(item.process.item_id)
      && this.validateService.token() 
      && this.validateService.credential(rpg));
  }

}
