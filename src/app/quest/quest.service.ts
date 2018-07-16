import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestService {

  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  quests(rpgId: number = null) {
    if (rpgId) {
      return this.http.get(`${this.baseUrl}/api/rpgs/${rpgId}/quests`);
    }
  }
}
