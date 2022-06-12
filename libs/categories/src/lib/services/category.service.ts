
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategory(categoryId:string): Observable<any>{
    return this.http.get(`http://localhost:3000/api/v1/categories/${categoryId}`)
  }
  getCategoriesList(): Observable<any>{
    return this.http.get("http://localhost:3000/api/v1/categories/")
  }
  createCategory(category: Category): Observable<any>{
    return this.http.post("http://localhost:3000/api/v1/categories/add-category" , category)
  }
  deleteCategory(categoryId: string): Observable<any>{
    return this.http.delete(`http://localhost:3000/api/v1/categories/delete-category/${categoryId}`)
  }
  updateCategory(category: Category):Observable<any>{
    return this.http.put(`http://localhost:3000/api/v1/categories/update-category/${category._id}` , category)
  }

}
