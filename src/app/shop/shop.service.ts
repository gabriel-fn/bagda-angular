import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Rpg } from '../shared/interfaces';

@Injectable()
export class ShopService {

  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { 
    console.log('shops service active'); 
  }

  shops(ofRpg: number = null): Observable<Rpg> {
    if (ofRpg && ofRpg > 0) {
        return this.http.get<Rpg>(`${this.baseUrl}/api/rpgs/${ofRpg}/shops`);
    }
  }
  
}
