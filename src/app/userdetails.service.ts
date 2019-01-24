import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {

  constructor(private http:HttpClient) { }

userdetails():Observable<any>
{
  return this.http.get<any>('admin/userdetails')
}
}