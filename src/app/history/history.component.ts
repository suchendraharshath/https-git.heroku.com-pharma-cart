import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../data.service';
import * as report from 'jspdf';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers:[{provide:'Window',useValue:window}]
})
export class HistoryComponent implements OnInit {
data:object[]=[];
  constructor(private ds:DataService,@Inject('Window') private window:Window) { }
  ngOnInit() {
    this.ds.getData3().subscribe(temp=>{this.data=temp;})
  }
  download()
  {
    var doc=new report();
    doc.save("report.pdf"); 
  }
  

}
