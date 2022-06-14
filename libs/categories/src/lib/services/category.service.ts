
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '@env/environment';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {
   categoriesUrl = environment.apiUrl + "categories"

  constructor(private http: HttpClient) { }

  getCategory(categoryId:string): Observable<any>{
    return this.http.get<any>(`${this.categoriesUrl}/${categoryId}`)
  }
  getCategoriesList(): Observable<any>{
    return this.http.get<any>(this.categoriesUrl)
  }
  createCategory(category: Category): Observable<any>{
    return this.http.post<any>( `${this.categoriesUrl}/add-category` , category)
  }
  deleteCategory(categoryId: string): Observable<any>{
    return this.http.delete<any>(`${this.categoriesUrl}/delete-category/${categoryId}`)
  }
  updateCategory(category: Category):Observable<any>{
    return this.http.put<any>(`${this.categoriesUrl}/update-category/${category._id}` , category)
  }

}
