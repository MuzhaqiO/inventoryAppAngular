import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseURL = 'http://localhost:8080/inventoryApp/category';

  constructor(private http:HttpClient) { }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.baseURL}/getAll`);
  }

  createCategory(category: Category): Observable<Category>{
    return this.http.post<Category>(`${this.baseURL}/createCategory`, category);
  }

  updateCateory(id: number, category: Category): Observable<Category>{
    return this.http.post<Category>(`${this.baseURL}/update/${id}`, category);
  }

  deleteCategory(id: number): Observable<any>{
    return this.http.delete(`${this.baseURL}/delete/${id}`);
  }
}
