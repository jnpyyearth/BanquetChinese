import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) {
    
   }

   login(token:string):void{
    localStorage.setItem('token',token);
   }
   getRole(){
    const token =localStorage.getItem('token');
    if(token){
      const payload:any =jwtDecode(token);
      return payload?.role||null;

    }
    return null;
   }

}
