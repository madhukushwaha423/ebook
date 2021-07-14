import {
  HttpClientModule,
  HttpErrorResponse,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { WebRequestService } from '../webRequest/web-request.service';
import { Book } from '../books';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:5000/';
  }

  httpOptions: any = new Headers({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  });

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.log('Error ocuured : ', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}`,
        +`body was : ${error.error}`
      );
      return throwError(
        'something bad happend , try after sometime  ' +
          error.message +
          error.name
      );
    }
  }

  testBackend(): Observable<any> {
    return this.http.get(this.ROOT_URL + 'book');
  }

  getAllBooks(): Observable<any> {
    return this.http
      .get<Book>(this.ROOT_URL + 'book/books')
      .pipe(catchError(this.handleError));
  }

  getallPopularBooks(): Observable<any> {
    return this.http
      .get<Book>(this.ROOT_URL + 'book/searchByType/' + 'Popular')
      .pipe(catchError(this.handleError));
  }

  getallMotivationalBooks(): Observable<any> {
    return this.http
      .get<Book>(this.ROOT_URL + 'book/searchByType/' + 'Motivational')
      .pipe(catchError(this.handleError));
  }

  getallExamBooks(): Observable<any> {
    return this.http
      .get<Book>(this.ROOT_URL + 'book/searchByType/' + 'Exam')
      .pipe(catchError(this.handleError));
  }

  getallReligiousBooks(): Observable<any> {
    return this.http
      .get<Book>(this.ROOT_URL + 'book/searchByType/' + 'Religious')
      .pipe(catchError(this.handleError));
  }

  getallTechnicalBooks(): Observable<any> {
    return this.http
      .get<Book>(this.ROOT_URL + 'book/searchByType/' + 'Technical')
      .pipe(catchError(this.handleError));
  }

  getallNatureBooks(): Observable<any> {
    return this.http
      .get<Book>(this.ROOT_URL + 'book/searchByType/' + 'Nature')
      .pipe(catchError(this.handleError));
  }

  getBookByType(type: string): Observable<any> {
    return this.http
      .get<Book>(this.ROOT_URL + 'book/searchByType/' + type)
      .pipe(catchError(this.handleError));
  }

  getBookById(id: string): Observable<any> {
    return this.http
      .get<Book>(this.ROOT_URL + 'book/searchById/' + id)
      .pipe(catchError(this.handleError));
  }

  createNewBook(data: Book): Observable<any> {
    return this.http
      .post(this.ROOT_URL + 'book/uploadBook', data, this.httpOptions)
      .pipe(retry(3), catchError(this.handleError));
  }

  uploadNewBook(data: Book) {
    return this.http
      .post(this.ROOT_URL + 'book/uploadBook', data, this.httpOptions)
      .pipe(retry(3), catchError(this.handleError));
  }

  updateBookDetails(id: string, book: Book): Observable<any> {
    return this.http
      .get<Book>(this.ROOT_URL + 'book/updateBookDetails' + id)
      .pipe(catchError(this.handleError));
  }

  deleteBook(id: string): Observable<any> {
    return this.http
      .delete<Book>(this.ROOT_URL + 'book/deleteBook' + id)
      .pipe(catchError(this.handleError));
  }

  addBook(
    bookType: string,
    bookName: string,
    bookAuthor: string,
    bookEdition: string,
    bookPrice: string,
    forRent: string,
    noOfPages: number,
    language: string,
    publisher: string,
    rating: string,
    bookDescription: string,
    avatar: File
  ): Observable<any> {
    var formData:any = new FormData();
    formData.append("bookType" , bookType);
    formData.append("bookName" , bookName);
    formData.append("bookAuthor" , bookAuthor);
    formData.append("bookEdition" , bookEdition);
    formData.append("bookPrice" , bookPrice);
    formData.append("forRent" , forRent);
    formData.append("noOfPages" , noOfPages);
    formData.append("language" , language);
    formData.append("publisher" , publisher);
    formData.append("rating" , rating);
    formData.append("bookDescription" , bookDescription);
    formData.append("avatar" , avatar);

    console.log(formData.value);

    return this.http.post(`${this.ROOT_URL}uploadbook` , formData , {
      reportProgress:true,
      observe:'events'

    })
  }




}
