import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  baseUrl: string = 'http://localhost:8000';

  constructor() { }

}
