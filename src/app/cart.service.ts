import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }
  sendTocart(v){
    console.log(v);
    this.http.post('user/pharma/babycare',v).subscribe(temp=>{alert(temp)});
  }

  sendCartdata():Observable<any>
  {
    return this.http.get<any>('user/cart')
  }

}
