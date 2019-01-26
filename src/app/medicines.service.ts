import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicinesService {
  data:any[]=[];
  data1:object[]=[];
  constructor(private http:HttpClient) { }
  receiveFrommedicines(v){
    console.log(v);
    this.http.post('admin/medicines',v).subscribe(temp=>{alert(temp)});
  }
  sendmedicinesdata():Observable<any>
  {
    return this.http.get<any>('admin/stock')
  }

  updateFrommedicines(v){
    console.log(v);
    this.http.put('admin/medicines',v).subscribe(temp=>alert(temp));
  }

  deleteMedicines(v){
    var httpOptions={
      headers:new HttpHeaders({'Content-type':'application/json'}),
      body:v
    }
    this.http.delete<any>('admin/medicines',httpOptions).subscribe(temp=>this.data1=temp);
  }
}
