import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  readonly ROOT_URL:any;

  constructor(
    private http:HttpClient
  ) {
    this.ROOT_URL = 'http://localhost:5000/';
   }


  orderNow(userid:any , bookid:any , country:any , pincode:any , state:any , city:any , total_price:any , phoneNumber:any){
    return this.http.post(`${this.ROOT_URL}user/${userid}/order`, {userid ,bookid , country , pincode , state , city , total_price , phoneNumber})
  }
}
