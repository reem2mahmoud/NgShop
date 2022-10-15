import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersServices {

  usersUrl = environment.apiUrl + "users"
  
  constructor(private http: HttpClient) { }
    /* Admin    ---> login , myProfile , edit , logout , All,showCustomers
                     ,showSalesMen ,CreateSalesMan */
    // Customer ---> register , login , myProfile , edit , logout , All
    // Sales    ---> login , myProfile  , logout , All 


  getUsersList(): Observable<any>{
    return this.http.get<any>(this.usersUrl)
  }
  register(user:User): Observable<any>{
    return this.http.post<any>( `${this.usersUrl}/register` , user)
  }
  login(user:User):Observable<any>{
    return this.http.post(`${this.usersUrl}/login` , user)
   }
   myProfile():Observable<any>{
    return this.http.get(`${this.usersUrl}/me`)
   }
   editMyProfile(user:any):Observable<any>{
    return this.http.post(`${this.usersUrl}/edit-my-profile`,user)
   }
   logOut():Observable<any>{
    return this.http.post(`${this.usersUrl}/logout`,null)
   }
   logOutAll():Observable<any>{
    return this.http.post(`${this.usersUrl}/logout-all`,null)
   }
 
}
