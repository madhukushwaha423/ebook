import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute ,Router } from "@angular/router";
import { BookService } from 'src/app/services/book/book.service';
import { Book } from 'src/app/services/books';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  bookitem :Book | undefined;
  bookPath = "http://localhost:5000/";


  constructor(
    public bookservice :BookService ,
    private activatedRoute :ActivatedRoute ,
    private router:Router
  ) { }

  ngOnInit(): void {

   this.getdetail()
  }

  getdetail(){
    const id = this.activatedRoute.snapshot.params.id
    return this.bookservice.getBookById(id).subscribe(  (data:Book) =>{
      // console.log(data);
      this.bookitem = data
      console.log(this.bookitem);
    }  )
  }

}
