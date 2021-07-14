import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hidePassword = true ;
  valid=false

  constructor(
    private fb : FormBuilder,
    private userService:UserService,
    private authenticationservice:AuthenticationService
  ) {
  }

  ngOnInit(): void {
  }

  userDetailsForm = this.fb.group({
    email:['', Validators.required ],
    password:['', Validators.required],
    confirm_password:['',Validators.required]
  })

  registerNewUser(){
    console.log(this.userDetailsForm.value.email);
    return this.authenticationservice.registerNewUser(
      this.userDetailsForm.value.email,this.userDetailsForm.value.password,this.userDetailsForm.value.confirm_password
      ).subscribe(
      (result:any) => {
        console.log(result);
        this.authenticationservice.setSession(result.id , result.accessToken ,result.RefreshToken)
      }
    )
  }



}
