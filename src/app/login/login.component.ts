import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    data1:boolean=false;
    data2:boolean=false;
  constructor(private login:LoginService,private router:Router) { }

  ngOnInit() {
  }

add(v)
{
  this.login.receiveFromlogin(v).subscribe(temp=>{alert(temp)
    if (temp=="invalid username"){
      this.router.navigate(['home/login']);
      this.data1=!this.data1;
    }
    else if(temp=="wrong password")
    {
      this.router.navigate(['/home/login']);
      this.data2=!this.data2;
    }
    else if(temp=="logged in successfully"){
      if(v.Username=="suchendra" && v.password=="suchendra@123"){
        this.router.navigate(['admin'])
      }
      else{
        this.router.navigate(['user'])
      }
    }
  });
  console.log(v);
  
}
}
