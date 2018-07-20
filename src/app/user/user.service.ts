import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { console.log('user service active'); }

  players(ofRpg: number = null) {
    if (ofRpg && ofRpg > 0) {
        return this.http.get(`${this.baseUrl}/api/rpgs/${ofRpg}/players`);
    }
  }

}
