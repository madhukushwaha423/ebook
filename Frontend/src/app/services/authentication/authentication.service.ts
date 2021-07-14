import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { userModel } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject:BehaviorSubject<any>;
  private currentUser :Observable<any>;
  readonly ROOT_URL;
  private isLoggedIn:any;
  data :any;


  constructor(private http: HttpClient , private router:ActivatedRoute, private route:Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
    this.ROOT_URL = "http://localhost:5000/";

}


httpOptions:any = new Headers({
  'Content-Type': 'application/json',
  Authorization : 'my-auth-token'
})

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

public get isUserLoggedIn(){
  const user = localStorage.getItem("user-id")
  if (user == null){
    return false
  }
  else{
    return true;
  }
}

login(email:any , password:any){
  return this.http.post(`${this.ROOT_URL}user/login`, {email,password})
  .pipe( (map(user => {
    console.log("Authentication service");
    this.currentUserSubject.next(user);
    this.route.navigate(['/'])
    return user;
  })) )
}

registerNewUser(email:any , password:any,confirm_password:any){
  return this.http.post(`${this.ROOT_URL}user/register`, {email,password,confirm_password})
  .pipe( (map(user => {
    this.currentUser.subscribe( data => this.data = data )
    this.currentUserSubject.next(user);
    this.route.navigate(['/'])
    return user;
  })) )
}


updateUserDetails(data:userModel):Observable<any>{
  return this.http.post(this.ROOT_URL+ '/signup' , data , this.httpOptions).pipe(
    retry(3),
    catchError(this.handleError)
  )
}

getUserById(id:any){
  return this.http.get(`${this.ROOT_URL}user/${id}`)
}

public setSession(userId:string, accesToken : string , refreshToken:string) {
  localStorage.setItem('user-id' , userId);
  localStorage.setItem('access-token' , accesToken);
  localStorage.setItem('refresh-token', refreshToken);
}

private removeSession() {
  localStorage.removeItem('user-id');
  localStorage.removeItem('access-token' );
  localStorage.removeItem('refresh-token');
  localStorage.removeItem('currentUser')
}

logout() {
  this.removeSession();
  location.reload();
}

}
