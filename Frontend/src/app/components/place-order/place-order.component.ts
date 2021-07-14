import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

  userLoggedInorNot = false;
  userId = localStorage.getItem('user-id')
  bookId = this.activatedRoute.snapshot.params.bookID
  bookPrice = this.activatedRoute.snapshot.params.bookPrice

  email = '';
  val : any ;

  constructor(
    private authenticationservice:AuthenticationService,
    private fb:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private orderservice:OrderService
    ) { }

  ngOnInit(): void {
    this.getUserDetails()
  }

  userDetailsForm = this.fb.group({
    userid:this.userId,
    bookid:this.bookId,
    total_Price:this.bookPrice,
    phoneNumber:['', Validators.required],
    state:['' ,Validators.required],
    city:['' , Validators.required],
    pincode:['', Validators.required],
    country:['',Validators.required],
  })

  getUserDetails(){
    this.userId = localStorage.getItem('user-id');
     this.authenticationservice.getUserById(this.userId).subscribe (
      (data:any) => {
        console.log(data);
        this.email = data.Email
        // this.userId
      }
    )
  }

  submit(){
    console.log(this.userDetailsForm.value);
    if(!this.userDetailsForm.valid){
      alert("Please fill all the details")
    }

    return this.orderservice.orderNow(this.userDetailsForm.value.userid , this.userDetailsForm.value.bookid , this.userDetailsForm.value.country,this.userDetailsForm.value.pincode , this.userDetailsForm.value.state, this.userDetailsForm.value.city , this.userDetailsForm.value.total_price , this.userDetailsForm.value.phoneNumber).subscribe
    ( (data:any) => {
      console.log(data);

    })

  }


}
