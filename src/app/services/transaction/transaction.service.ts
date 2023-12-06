import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private API_URL = 'http://localhost:8080/transaction'

  constructor(private http: HttpClient) { }

  getTransactionByMonth(month: number): Observable<any> {
    const url = `${this.API_URL}/findByMonth?month=${month}`;
    return this.http.get(url);
  }
}
