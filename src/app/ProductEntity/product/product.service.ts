import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = 'http://localhost:8080/inventoryApp/product';

  constructor(private http:HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseURL}/getAll`);
  }

  createProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(`${this.baseURL}/createProduct`, product);
  }

  updateProduct(id: number, product: Product): Observable<Product>{
    return this.http.post<Product>(`${this.baseURL}/update/${id}`, product);
  }

  deleteProduct(id: number): Observable<any>{
    return this.http.delete(`${this.baseURL}/delete/${id}`);
  }
}