import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';
import { Book } from 'src/app/services/books';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  arrayOfPopularBooks: Book[] = [];
  arrayOfMotivationalBooks: Book[] = [];
  arrayOfExamBooks: Book[] = [];
  arrayOfTechnicalBooks: Book[] = [];
  arrayOfReligiousBooks: Book[] = [];
  arrayOfNobelsBooks: Book[] = [];


  constructor(
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getallPopularBooks()
    this.getallExamBooks()
    this.getallMotivationalBooks()
    this.getallNobelBooks()
    this.getallTechnicalBooks()
    this.getallReligiousBooks()
  }



  ShowSelectedBookDetail(bookId: string) {
    this.router.navigate(['/bookdetail/', bookId]);
  }


  showSelectedCategory(type:string){
    this.router.navigate(['/booksByCategory/',  type])
  }


  getallPopularBooks(): any {
    this.bookService.getallPopularBooks().subscribe((response: any) => {
      this.arrayOfPopularBooks = response;
      console.log(this.arrayOfPopularBooks);
    })
  }


  getallMotivationalBooks(): any {
    var type = "Motivational";
    this.bookService.getBookByType(type).subscribe((response: any) => {
      this.arrayOfMotivationalBooks = response;
      console.log(this.arrayOfMotivationalBooks);
    })
  }


  getallExamBooks(): any {
    this.bookService.getBookByType("Exam").subscribe((response: any) => {
      this.arrayOfExamBooks = response;
      console.log(this.arrayOfExamBooks);
    })
  }


  getallTechnicalBooks(): any {
    this.bookService.getBookByType("Technical").subscribe((response: any) => {
      this.arrayOfTechnicalBooks = response;
      console.log(this.arrayOfTechnicalBooks);
    })
  }


  getallReligiousBooks(): any {
    this.bookService.getBookByType("Religious").subscribe((response: any) => {
      this.arrayOfReligiousBooks = response;
      console.log(this.arrayOfReligiousBooks);
    })
  }


  getallNobelBooks(): any {
    var type = "Nobel"
    this.bookService.getBookByType(type).subscribe((response: any) => {
      this.arrayOfNobelsBooks = response;
      console.log(this.arrayOfNobelsBooks);
    })
  }


}
