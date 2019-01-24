import { Component, OnInit } from '@angular/core';
import { MedicinesService } from '../medicines.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  data:object[]=[];
  constructor(private ms:MedicinesService) {
  
   }

  ngOnInit() {
    this.ms.sendmedicinesdata().subscribe(temp=>{this.data=temp})
    console.log(this.data)
  }

}
