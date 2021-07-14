import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from "@angular/router";
import { BookService } from 'src/app/services/book/book.service';
import { Book } from 'src/app/services/books';

@Component({
  selector: 'app-popular-books',
  templateUrl: './popular-books.component.html',
  styleUrls: ['./popular-books.component.css']
})
export class PopularBooksComponent implements OnInit {

  arrayOfBooks: Book[] = [];
  category:any='';
  bookPath = "http://localhost:5000/";

  collection:any = [];
  p:any=1;

  // sort by variables
  checked = false;
  color = 'primary'


  constructor(
    private activeRoute:ActivatedRoute,
    private router:Router,
    private bookService:BookService
  ) {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }

  ngOnInit(): void {
    this.getByCategory()
  }

  getByCategory(){
    const type = this.activeRoute.snapshot.params.type
    this.category = type
    return this.bookService.getBookByType(type).subscribe( (data:any) => {
      this.arrayOfBooks = data
      //console.log(this.arrayOfBooks);

    })
  }


  counter(i:number){
    return new Array(i)
  }
  count(i:number){
    return new Array(i)
  }

}
