import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { console.log('reports service active'); }

  reports(ofRpg: string|number = null) {
    if (ofRpg) {
      if (ofRpg === 'all') {
        return this.http.get(`${this.baseUrl}/api/reports`);
      } else if (ofRpg > 0) {
        return this.http.get(`${this.baseUrl}/api/rpgs/${ofRpg}/reports`);
      }
    }
  }
}
