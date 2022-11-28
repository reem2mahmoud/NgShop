import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsUrl = environment.apiUrl + "products"

  constructor(private http: HttpClient) { }

  getProduct(productId:string): Observable<any>{
    return this.http.get<any>(`${this.productsUrl}/${productId}`)
  }
  getProductsList(): Observable<any>{
    return this.http.get<any>(this.productsUrl)
  }
  createProduct(product: FormData): Observable<any>{
    return this.http.post<any>( `${this.productsUrl}/add-product` , product)
  }
  deleteProduct(productId: string): Observable<any>{
    return this.http.delete<any>(`${this.productsUrl}/delete-product/${productId}`)
  }
  updateProduct(product: FormData , product_id : string):Observable<any>{
  console.log('product in service' , product)
    return this.http.put<any>(`${this.productsUrl}/update-product/${product_id}` , product)
  }
  getFeaturedProducts(count:number):Observable<any>{
    return this.http.get<any>(`${this.productsUrl}/get-featured-products/${count}`)
  }
}
