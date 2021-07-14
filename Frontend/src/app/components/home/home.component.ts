import { Component, OnInit } from '@angular/core';
import {} from 'rxjs/operators';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';
import { Book } from 'src/app/services/books';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  public innerWidth: any;
  public cellstoshow :any = 4;
  books: Book[] = [];

  constructor(
    private bookservice: BookService,
    private router: Router,
    private toastr: ToastrService
    ) {
    }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth);

    this.getBooks();
  }



  testbackend() {
    this.bookservice.testBackend().subscribe((res: any) => {
      console.log('Working');
    });
  }

  showDetils(bookId: number) {
    this.router.navigate(['/bookdetail/', bookId]);
  }

  getBooks(): void {
    this.bookservice.getAllBooks().subscribe((data: any) => {
      this.books.push(data);
    });
  }

  creteNewBook(): void {
    this.router.navigate(['/upload-book']);
  }

  //delete Book
  deleteBook(id: string): void {
    this.bookservice.deleteBook(id).subscribe(
      () => {
        this.getBooks();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  showSelectedCategory(type: string) {
    this.router.navigate(['/booksByCategory/', type]);
  }
}
