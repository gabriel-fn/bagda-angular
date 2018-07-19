import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RpgService {

  private baseUrl = 'http://localhost:8000';

  constructor(private authService: AuthService, 
              private http: HttpClient) { console.log('rpg service active') }

  rpgs(typeOfRpgList: string) {
    if (typeOfRpgList === '/rpgs/user') {
      return this.http.get(`${this.baseUrl}/api/rpgs/user`);
    } else {
      return this.http.get(`${this.baseUrl}/api/rpgs`);
    }
  }

  rpg(id: number) {
    //this.authService.authUser.getValue();
    return this.http.get(`${this.baseUrl}/api/rpgs/${id}`);
  }
}
