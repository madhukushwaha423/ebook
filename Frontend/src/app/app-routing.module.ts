import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PopularBooksComponent } from './components/Books/popular-books/popular-books.component';
import { DetailPageComponent } from './components/detail-page/detail-page.component';
import { Page404Component } from './components/errorPages/page404/page404.component';
import { FooterComponent } from './components/home/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { BookuploadComponent } from './components/uploadForms/bookupload/bookupload.component';
import { AuthGuard } from './services/authGuard/auth.guard';

const routes: Routes = [
 {
   path:'',
   component:HomeComponent,
  //  canActivate:[AuthGuard]
 },
 {
   path:'bookdetail/:id',
   component:DetailPageComponent,

 },
 {
   path:'bookForm',
   component :BookuploadComponent,
  //  canActivate:[AuthGuard]
 },
 {
   path:'popularBooks',
   component:PopularBooksComponent
 },
 {
   path:'booksByCategory/:type',
   component:PopularBooksComponent
 },
 {
   path:'signin' ,
   component:SigninComponent
 },
 {
  path:'signup' ,
  component:SignupComponent
},
{
  path:'orderNow/:bookID/:bookPrice' ,
  component:PlaceOrderComponent
},

//otherwise redirect to home page
{path : '**' ,
redirectTo:''
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
