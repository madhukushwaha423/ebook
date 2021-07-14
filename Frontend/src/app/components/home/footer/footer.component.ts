import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  services:Array<string> = [
    'story books',
    'Politics Books',
    'Exam Books',
    'Art',
    'Personal Growth',
    'Science & Researches',
    'Fiction & literature'
  ]

}
