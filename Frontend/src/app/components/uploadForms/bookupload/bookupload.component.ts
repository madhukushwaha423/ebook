import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BookService } from 'src/app/services/book/book.service';
import { Book } from 'src/app/services/books';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-bookupload',
  templateUrl: './bookupload.component.html',
  styleUrls: ['./bookupload.component.css'],
})
export class BookuploadComponent implements OnInit {
  validForm = '';
  progress :any ;
  selectedFile!: File;

  readonly ROOT_URL;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.ROOT_URL = 'http://localhost:5000/';
  }

  ngOnInit(): void {
    this.uplodadBookForm;
  }

  uplodadBookForm = this.formBuilder.group({
    bookType: ['', Validators.required],
    bookName: ['', Validators.required],
    bookAuthor: ['', Validators.required],
    bookEdition: ['', Validators.required],
    bookPrice: ['', Validators.required],
    forRent: ['', Validators.required],
    noOfPages: ['', Validators.required],
    language: ['', Validators.required],
    publisher: ['', Validators.required],
    bookDescription: [''],
    image: ['', Validators.required],
  });


  onfileSelected(event: any) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }

  addBook() {
    var formData: any = new FormData();
    formData.append('bookType', this.uplodadBookForm.value.bookType);
    formData.append('bookName', this.uplodadBookForm.value.bookName);
    formData.append('bookAuthor', this.uplodadBookForm.value.bookAuthor);
    formData.append('bookEdition', this.uplodadBookForm.value.bookEdition);
    formData.append('bookPrice', this.uplodadBookForm.value.bookPrice);
    formData.append('forRent', this.uplodadBookForm.value.forRent);
    formData.append('noOfPages', this.uplodadBookForm.value.noOfPages);
    formData.append('language', this.uplodadBookForm.value.language);
    formData.append('publisher', this.uplodadBookForm.value.publisher);
    formData.append('rating', this.uplodadBookForm.value.rating);
    formData.append(
      'bookDescription',
      this.uplodadBookForm.value.bookDescription
    );
    formData.append('image', this.selectedFile, this.selectedFile.name);

    console.log(formData.value);

    this.http
      .post(`${this.ROOT_URL}uploadbook`, formData , {
        reportProgress:true,
        observe:'events'
      })
      .subscribe((event: any) => {
        if(event.type === HttpEventType.UploadProgress){
          this.progress = Math.round(event.loaded / event.total * 100)
          console.log("Upload progress  " + this.progress +  " %");
        }
        console.log(event);
      });
      // this.router.navigate(['/'])
  }
}
