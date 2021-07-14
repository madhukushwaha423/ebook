import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgImageSliderModule } from "ng-image-slider";
import { AppRoutingModule } from './app-routing.module';
// import {IvyCarouselModule} from 'angular-responsive-carousel';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/home/header/header.component';
import { FooterComponent } from './components/home/footer/footer.component';
import { AuthComponent } from './components/auth/auth.component';
import { DetailPageComponent } from './components/detail-page/detail-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookuploadComponent } from './components/uploadForms/bookupload/bookupload.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Modules/material/material.module';
import { CategoriesComponent } from './components/home/header/categories/categories.component';
import { Page404Component } from './components/errorPages/page404/page404.component';
import { Page500Component } from './components/errorPages/page500/page500.component';
import { PopularBooksComponent } from './components/Books/popular-books/popular-books.component';
import { SigninComponent } from './components/signin/signin.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { BookService } from './services/book/book.service';
import { AuthInterceptor } from './services/interceptor/auth.interceptor';
import { WebRequestService } from './services/webRequest/web-request.service';
import { SignupComponent } from './components/signup/signup.component';
import { ErrorInterceptor } from './services/interceptor/error.interceptor';
import { NgxPaginationModule } from "ngx-pagination";
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AuthComponent,
    DetailPageComponent,
    BookuploadComponent,
    Page404Component,
    Page500Component,
    PopularBooksComponent,
    SigninComponent,
    PlaceOrderComponent,
    AboutUsComponent,
    CategoriesComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgImageSliderModule,
    ToastrModule.forRoot(),
  ],
  providers: [WebRequestService,
    BookService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:ErrorInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
