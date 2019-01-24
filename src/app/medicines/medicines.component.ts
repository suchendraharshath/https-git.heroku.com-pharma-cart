import { Component, OnInit } from '@angular/core';
import { MedicinesService } from '../medicines.service';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit {

  constructor(private ms:MedicinesService) {   }
  data:object[]=[];
  data1:object[]=[];
  category:string;
  medicine:string;
  price:string;
  quantity:string;
  date:string;
  add(v)
  {
    console.log(v);
    this.category=v;
  this.medicine=v;
  this.price=v;
  this.quantity=v;
  this.date=v;
  this.data.push(v);
  this.category=" ";
  this.medicine=" ";
  this.price="";
  this.quantity="";
  this.date="";
  this.ms.receiveFrommedicines(v);
  }
  Edit(v){
    this.data1=v;
  }
  save(){
    this.ms.updateFrommedicines(this.data1)
  }
  ngOnInit(){
    this.ms.sendmedicinesdata().subscribe(temp=>{this.data=temp})
  }
}
