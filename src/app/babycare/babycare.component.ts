import { Component, OnInit } from '@angular/core';
import { MedicinesService } from '../medicines.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-babycare',
  templateUrl: './babycare.component.html',
  styleUrls: ['./babycare.component.css']
})
export class BabycareComponent implements OnInit {
  data:object[]=[];
  p:string;
  constructor(private ms:MedicinesService, private cart:CartService) { }
  
  ngOnInit() {
    //getting data from medicines collecion
    this.ms.sendmedicinesdata().subscribe(temp=>{this.data=temp})
    console.log(this.data)
  }
  //sending data to card collection
  sendto(v){
    this.cart.sendTocart(v);
  }



}
