import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Item, Player, HttpSuccessResponse } from '../shared/interfaces';
import { HelperService } from '../shared/helper.service';
import { ValidateService } from '../shared/validate.service';

@Injectable()
export class PlayerService {

  private baseUrl: string;

  constructor(private helperService: HelperService,
              private validateService: ValidateService,
              private http: HttpClient) { 
    this.baseUrl = this.helperService.baseUrl;
  }

  discardItem(playerId: number, itemId: number): Observable<HttpSuccessResponse> {
    return this.http.put<HttpSuccessResponse>(`${this.baseUrl}/api/rpgs/items/discard`, {player_id: playerId, item_id: itemId});
  }

  dismissRequest(playerId: number, itemId: number): Observable<HttpSuccessResponse> {
    return this.http.put<HttpSuccessResponse>(`${this.baseUrl}/api/rpgs/requests/dismiss`, {player_id: playerId, item_id: itemId});
  }

  approveRequest(playerId: number, itemId: number): Observable<HttpSuccessResponse> {
    return this.http.put<HttpSuccessResponse>(`${this.baseUrl}/api/rpgs/requests/approve`, {player_id: playerId, item_id: itemId});
  }

  update(value): Observable<HttpSuccessResponse> {
    let input: FormData = new FormData();
    input.append('player_id', value.player_id);
    input.append('gold', value.gold);
    input.append('cash', value.cash);
    input.append('detail', value.detail);
    input.append('credential', value.credential);
    if (value.image !== null) {
      input.append('image', value.image);
    }
    return this.http.post<HttpSuccessResponse>(`${this.baseUrl}/api/rpgs/players/update`, input);
  }

  delete(playerId: number): Observable<HttpSuccessResponse> {
    return this.http.delete<HttpSuccessResponse>(`${this.baseUrl}/api/rpgs/players/delete/${playerId}`);
  }

  ItemOrRequestValidate(item: Item): boolean {
    return (this.validateService.id(item.process.player_id)
      && this.validateService.id(item.process.item_id)
      && this.validateService.token() 
      && this.validateService.credential());
  }

  editPlayerValidate(player: Player): boolean {
    return (this.validateService.token()
            && this.validateService.moderator()
            && this.validateService.canTouchPlayer(player.credential));
  }

}
