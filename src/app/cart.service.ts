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
    this.http.post('user/pharma/babycare',v).subscribe(temp=>{alert(temp)});
  }

  sendCartdata():Observable<any>
  {
    return this.http.get<any>('user/cart')
  }

  deleteCart(v){
    var httpOptions={
      headers:new HttpHeaders({'Content-type':'application/json'}),
      body:v
    }
    this.http.delete<any>('user/cart',httpOptions).subscribe(temp=>this.data=temp);
  }

}
