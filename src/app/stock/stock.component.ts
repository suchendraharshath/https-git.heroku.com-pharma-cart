import { Component, OnInit } from '@angular/core';
import { MedicinesService } from '../medicines.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  data:object[]=[];
  search:string;
  p:number;
  constructor(private ms:MedicinesService) {
  
   }

  ngOnInit() {
    this.ms.sendmedicinesdata().subscribe(temp=>{
      if(temp['message']=='Token is not valid'){
        alert(temp['message']);
      }
      else{
        this.data=temp
      }
    })
      
      //{this.data=temp})
    console.log(this.data)
  }

}
