import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Rpg } from '../shared/interfaces';
import { AuthService } from './../auth/auth.service';

@Injectable()
export class RpgService {

  private baseUrl = 'http://localhost:8000';

  constructor(private authService: AuthService, 
              private http: HttpClient) { 
    console.log('rpg service active'); 
  }

  rpgs(typeOfRpgList: string): Observable<Rpg[]> {
    if (typeOfRpgList === '/rpgs/user') {
      return this.http.get<Rpg[]>(`${this.baseUrl}/api/rpgs/user`);
    } else {
      return this.http.get<Rpg[]>(`${this.baseUrl}/api/rpgs`);
    }
  }

  rpg(id: number): Observable<Rpg> {
    //this.authService.authUser.getValue();
    return this.http.get<Rpg>(`${this.baseUrl}/api/rpgs/${id}`);
  }
}
