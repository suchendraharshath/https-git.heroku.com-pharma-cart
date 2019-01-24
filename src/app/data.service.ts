import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
s:object[]=[];
b:object[]=[];
  constructor(private http:HttpClient) { }

receiveFromMedicine(v)
{
  this.s=v;
}
sendToStock()
{
  return this.s;
}
receiveFromBaby(v){
  this.b=v;
}
sendToCart(){
  return this.b;
}
getData():Observable<any>{
  return this.http.get<any>("assets/userdetails.json");
  }
  getData1():Observable<any>{
    return this.http.get<any>("assets/transaction.json");
    }
    getData2():Observable<any>{
      return this.http.get<any>("assets/baby.json");
      }
      getData3():Observable<any>{
        return this.http.get<any>("assets/history.json");
        }
  
}
