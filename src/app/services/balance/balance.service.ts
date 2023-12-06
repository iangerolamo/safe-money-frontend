import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  private API_URL = 'http://localhost:8080/balance'

  constructor(private http: HttpClient) { }

  getBalanceByMonth(month: number): Observable<any> {
    const url = `${this.API_URL}/byMonth?month=${month}`;
    return this.http.get(url);
  }
}
