import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from './bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private baseURL = 'http://localhost:8080/inventoryApp/bill';

  constructor(private http:HttpClient) { }

  getBills(): Observable<Bill[]>{
    return this.http.get<Bill[]>(`${this.baseURL}/getAll`);
  }

  createBill(bill: Bill): Observable<Bill>{
    return this.http.post<Bill>(`${this.baseURL}/createBill`, bill)
  }

  getBillById(billId: number): Observable<Bill>{
    return this.http.get<Bill>(`${this.baseURL}/billId/${billId}`);
  }
}