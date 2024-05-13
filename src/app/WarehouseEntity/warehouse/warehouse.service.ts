import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Warehouse  } from './warehouse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private baseURL = 'http://localhost:8080/inventoryApp/warehouse';

  constructor(private http:HttpClient) { }

  getWarehouses(): Observable<Warehouse[]>{
    return this.http.get<Warehouse[]>(`${this.baseURL}/getAll`);
  }

  updateWarehouse(id: number, quantity: number): Observable<Warehouse>{
    return this.http.post<Warehouse>(`${this.baseURL}/updateWarehouse/${id}`, quantity, this.httpOptions);
  }
}
