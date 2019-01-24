import { Component, OnInit } from '@angular/core';
import { UserdetailsService } from '../userdetails.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  data:object[]=[];
  constructor(private us:UserdetailsService) { }

  ngOnInit() {
    this.us.userdetails().subscribe(temp=>{this.data=temp})
  }
  
}
