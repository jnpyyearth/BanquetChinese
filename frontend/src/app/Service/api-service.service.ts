import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const apiUrl ='http://localhost:5014'
@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {

  constructor(private http: HttpClient) { }
  Register(registerData:FormData):Observable<any>{
    console.log("hello register service");
    return this.http.post(`${apiUrl}/api/register/register`,registerData);
  }
}
