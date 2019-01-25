import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  firstname:string;
  middlename:string;
  lastname:string;
  Username:string;
  email:string;
  password:string;
  gender:string;
  
  constructor(private ds:SignupService, private router:Router) { 
  }
  
  ngOnInit() {
  }
  add(v){
    this.ds.receiveFromsignup(v);
    console.log(v);
    
  }
 

}
