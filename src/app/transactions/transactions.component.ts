import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  data:object[]=[];
  constructor(private ds:DataService) { }

  ngOnInit() {
    this.ds.getData1().subscribe(temp=>{this.data=temp;})
  }
  
}
