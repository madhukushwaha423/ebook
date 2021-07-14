import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser:any;
  loggenInOrNot:any;
  constructor(
    private bookService:BookService,
    private router:Router,
    private authenticationservice:AuthenticationService
  ) {
    this.currentUser = this.authenticationservice.isUserLoggedIn
    this.isUserLogin()
    console.log(this.loggenInOrNot);

  }

  ngOnInit(): void {
  }

  isUserLogin(){
    this.loggenInOrNot = this.authenticationservice.isUserLoggedIn
  }

  logout(){
    console.log("Logging out");
    this.authenticationservice.logout()
    return;
  }

}
