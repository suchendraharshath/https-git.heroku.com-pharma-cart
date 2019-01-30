import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
data:string;
  constructor(private http:HttpClient) { }
  sendTocart(v){
    console.log(v);
    this.http.post('api/user/pharma/babycare',v).subscribe(temp=>{
      if(temp['message']=='Token is not valid'){
        alert(temp['message']);
      }
      else{
        alert(temp);
      }
      //{alert(temp)}
    });
  }

  sendCartdata():Observable<any>
  {
    return this.http.get<any>('api/user/cart')
  }

  deleteCart(v){
    var httpOptions={
      headers:new HttpHeaders({'Content-type':'application/json'}),
      body:v
    }
    this.http.delete<any>('api/user/cart',httpOptions).subscribe(temp=>{
      if(temp['message']=='Token is not valid'){
        alert(temp['message']);
      }
      else{
        this.data=temp;
      }
      //this.data=temp
    });
  }

}
