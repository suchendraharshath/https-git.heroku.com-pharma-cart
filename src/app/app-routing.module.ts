import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { Home1Component} from './home1/home1.component';
import { StockComponent } from './stock/stock.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UserComponent } from './user/user.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { DiseasesComponent } from './diseases/diseases.component';
import { HistoryComponent } from './history/history.component';
import { AboutusComponent } from './aboutus/aboutus.component';
const routes: Routes = [
              {path:'home',component:HomeComponent,children:[{path:'home1',component:Home1Component},
                                                            {path:'aboutus',component:AboutusComponent},
                                                            {path:'pharma',component:PharmaComponent, children:[{path:'diseases',component:DiseasesComponent},
                                                                                                                {path:'babycare',component:BabycareComponent},
                                                                                                                {path:'skincare',component:SkincareComponent},
                                                                                                                {path:'firstaid',component:FirstaidComponent},
                                                                                                                {path:'vitamins',component:VitaminsComponent},
                                                                                                                {path:'diabetics',component:DiabeticsComponent}
                                                            ]},
                                                           {path:'login',component:LoginComponent},
                                                           {path:'signup',component:SignupComponent},
                                                           {path:'login/signup',component:SignupComponent}
                                                          ]},    
              {path:'user',component:UserComponent, children:[{path:'pharma',component:PharmaComponent, children:[{path:'diseases',component:DiseasesComponent},
                                                                                                                {path:'babycare',component:BabycareComponent},             
                                                                                                                 {path:'skincare',component:SkincareComponent},
                                                                                                                  {path:'firstaid',component:FirstaidComponent},
                                                                                                                  {path:'vitamins',component:VitaminsComponent},
                                                                                                                  {path:'diabetics',component:DiabeticsComponent}
                                                                                                                  ]},
                                                                                                                  {path:'',component:DiseasesComponent},
                                                                                                                  {path:'diseases',component:DiseasesComponent},
                                                                                                                  {path:'cart',component:CartComponent},
                                                                                                                  {path:'history',component:HistoryComponent}
                                                                      ]},                                                  
            {path:'admin',component:AdminComponent,children:[{path:'',component:StockComponent},
                                                              {path:'stock',component:StockComponent},
                                                              {path:'medicines',component:MedicinesComponent},										
                                                              {path:'userdetails',component:UserdetailsComponent},									
                                                              {path:'transactions',component:TransactionsComponent}
                                                            ]},
                        {path:'',redirectTo:'home/home1',pathMatch:'full'}
                      ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
