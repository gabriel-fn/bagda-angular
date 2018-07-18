import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RpgService {

  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { console.log('rpg service active') }

  rpgs(typeOfRpgList: string) {
    if (typeOfRpgList === '/rpgs/user') {
      return this.http.get(`${this.baseUrl}/api/rpgs/user`);
    } else {
      return this.http.get(`${this.baseUrl}/api/rpgs`);
    }
  }

  rpg(id: number) {
    return this.http.get(`${this.baseUrl}/api/rpgs/${id}`);
  }
}
