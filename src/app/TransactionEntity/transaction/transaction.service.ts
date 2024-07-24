import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from './transaction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private baseURL = 'http://localhost:9999/inventoryApp/transactions';
 
  constructor(private http:HttpClient) { }

  createTransaction(billId: number, transaction: Transaction): Observable<Transaction>{
    return this.http.post<Transaction>(`${this.baseURL}/createTransaction/${billId}`, transaction);
  }
}
