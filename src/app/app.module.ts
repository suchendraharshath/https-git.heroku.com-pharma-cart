import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PharmaComponent } from './pharma/pharma.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { BabycareComponent } from './babycare/babycare.component';
import { SkincareComponent } from './skincare/skincare.component';
import { FirstaidComponent } from './firstaid/firstaid.component';
import { VitaminsComponent } from './vitamins/vitamins.component';
import { DiabeticsComponent } from './diabetics/diabetics.component';
import { AdminComponent } from './admin/admin.component';
import { StockComponent } from './stock/stock.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UserComponent } from './user/user.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { Home1Component } from './home1/home1.component';
import { MedicinesComponent } from './medicines/medicines.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DiseasesComponent } from './diseases/diseases.component'; 
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from './search.pipe';
import { HistoryComponent } from './history/history.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AuthorizationService } from './authorization.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PharmaComponent,
    LoginComponent,
    MedicinesComponent,
    SignupComponent,
    CartComponent,
    BabycareComponent,
    SkincareComponent,
    FirstaidComponent,
    VitaminsComponent,
    DiabeticsComponent,
    AdminComponent,
    StockComponent,
    TransactionsComponent,
    UserComponent,
    UserdetailsComponent,
    Home1Component,
    DiseasesComponent,
    SearchPipe,
    HistoryComponent,
    AboutusComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthorizationService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
