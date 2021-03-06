import { Component, OnInit } from '@angular/core';
import { MedicinesService } from '../medicines.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit {
  p:string;
  constructor(private ms:MedicinesService, private http:HttpClient) {   }
  data:object[]=[];
  data1:any={};
  category:string;
  medicine:string;
  price:string;
  quantity:string;
  date:string;
  searchTerm:string;

  add(v)
  {
    console.log(v);
    this.category=v;
  this.medicine=v;
  this.price=v;
  this.quantity=v;
  this.date=v;
  //this.data.push(v);
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
  delete(v,p)
  {
    this.data.splice(p,1);
    this.ms.deleteMedicines(v);
  }
}
