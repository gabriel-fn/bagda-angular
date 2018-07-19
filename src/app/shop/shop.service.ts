import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ShopService {

  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { console.log('reports service active'); }

  shops(ofRpg: number = null) {
    if (ofRpg && ofRpg > 0) {
        return this.http.get(`${this.baseUrl}/api/rpgs/${ofRpg}/shops`);
    }
  }
}
