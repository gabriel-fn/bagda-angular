import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { HelperService } from '../shared/helper.service';

@Injectable()
export class PlayerService {

  private baseUrl: string;

  constructor(private helperService: HelperService,
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

}
