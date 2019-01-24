import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  data:string;
  constructor(private http:HttpClient, private router:Router) { }
  receiveFromsignup(v){
    this.data=v;
    this.http.post('home/signup',v).subscribe(temp=>{alert(temp)
    if(temp==="registration succesfull"){
      this.router.navigate(["home/login"]);
    }
    if(temp==="user existed change Username"){
      this.router.navigate(["home/signup"]);
    }
  });
   }
}
