import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Rpg, Token, Item } from '../shared/interfaces';
import { HelperService } from '../shared/helper.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ShopService {

  private baseUrl: string;
  private token: Token;

  constructor(private http: HttpClient,
              private authService: AuthService,
              private helperService: HelperService) { 
    console.log('shops service active'); 
    this.baseUrl = this.helperService.baseUrl;
    this.authService.seeAuthUser.subscribe((token: Token) => this.token = token);
  }

  buy(itemId: number): Observable<{error: boolean, message: string}> {
    return this.http.get<{error: boolean, message: string}>(`${this.baseUrl}/api/rpgs/items/${itemId}/buy`);
  }

  buyValidate(item: Item, rpg: Rpg): boolean {
    return (this.helperService.idValidate(item.id)
      && this.helperService.tokenValidate(this.token) 
      && this.helperService.credentialValidate(rpg)
      && this.helperService.itemLimiteValidate(item)
      && this.helperService.itemPayValidate(item, rpg));
  }
}
