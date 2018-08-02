import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Rpg, Item } from '../shared/interfaces';
import { HelperService } from '../shared/helper.service';
import { ValidateService } from '../shared/validate.service';

@Injectable()
export class ShopService {

  private baseUrl: string;

  constructor(private http: HttpClient,
              private validateService: ValidateService,
              private helperService: HelperService) { 
    console.log('shops service active'); 
    this.baseUrl = this.helperService.baseUrl;
  }

  buy(itemId: number): Observable<{error: boolean, message: string}> {
    return this.http.put<{error: boolean, message: string}>(`${this.baseUrl}/api/rpgs/items/buy`, {item_id: itemId});
  }

  buyValidate(item: Item, rpg: Rpg): boolean {
    return (this.validateService.id(item.id)
      && this.validateService.token() 
      && this.validateService.credential(rpg)
      && this.validateService.itemLimite(item)
      && this.validateService.itemPay(item, rpg.player)
    );
  }
}
