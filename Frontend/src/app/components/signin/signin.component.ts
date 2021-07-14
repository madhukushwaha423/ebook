import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  hidePassword = true ;
  loading=false
  submitted = false
  returnUrl: string = "";
  error:string = "";

  constructor(
    private fb : FormBuilder,
    private userService:UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationservice:AuthenticationService
      ) {
        // if(){
          // this.router.navigate(['/'])
        // }
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  userDetailsForm = this.fb.group({
    email:['', Validators.required ],
    password:['', Validators.required],
  })

 // convenience getter for easy access to form fields
 get valuesOfForm(){
   return this.userDetailsForm.controls;
 }

//  onSubmit(){
//    this.submitted = true;

//    //if from is invalid than stop here
//    if (this.userDetailsForm.invalid){
//      return ;
//    }

//    this.loading = true;
//    this.authenticationservice.login(this.userDetailsForm.value.email , this.userDetailsForm.value.password)
//    .pipe ( first())
//    .subscribe(
//      data => {
//        console.log("signin" , data);
//       //  this.setSession(data.id , data.accessToken ,data.RefreshToken)
//       //  this.router.navigate(['/'])
//      },
//      error => {
//        this.error = error;
//        this.loading= false
//      }
//    )

//  }

 onSubmit(){
  console.log(this.userDetailsForm.value.email);
  return this.authenticationservice.login(
    this.userDetailsForm.value.email,this.userDetailsForm.value.password
    ).subscribe(
    (result:any) => {
      console.log(result);
      this.authenticationservice.setSession(result.id , result.accessToken ,result.RefreshToken)
    }
  )
}





}
