import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { userModel } from '../user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly ROOT_URL: any;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http:/localhost:5000/user/';
  }

  private handleError(error:HttpErrorResponse): any{
    if( error.error instanceof ErrorEvent){
      console.log("Error ocuured : ", error.error.message);

    }else{
      console.error(
        `Backend returned code ${error.status}`, +
        `body was : ${error.error}`
      )
      return throwError(
        'something bad happend , try after sometime  '+ error.message+ error.name
      )
    }
  }

  httpOptions:any = new Headers({
    'Content-Type': 'application/json',
    Authorization : 'my-auth-token'
  })

  newUser(data:userModel ){
    return this.http.post(this.ROOT_URL+'signup' , data,this.httpOptions ).pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  login(email:any , password:any){
    return this.http.post(this.ROOT_URL+'login' , {email:"me@you.com",password:"madhu423"} , this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }


}
