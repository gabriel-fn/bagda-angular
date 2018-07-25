import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Rpg } from '../shared/interfaces';
import { HelperService } from '../shared/helper.service';

@Injectable()
export class ShopService {

  private baseUrl: string;

  constructor(private http: HttpClient,
              private helperService: HelperService) { 
    console.log('shops service active'); 
    this.baseUrl = this.helperService.baseUrl;
  }

  buy(itemId: number): Observable<{error: boolean, message: string, data: Rpg}> {
    return this.http.get<{error: boolean, message: string, data: Rpg}>(`${this.baseUrl}/api/rpgs/items/${itemId}/buy`);
  }
  
}
