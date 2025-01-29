import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) {
    
   }

   
   getRole(){
    const token =localStorage.getItem('token');
    if(token){
      const payload:any =jwtDecode(token);
      return payload?.role||null;

    }
    return null;
   }
   
    login(token:string):void{
      localStorage.setItem('token',token);
    }
  //remove token
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/']);
  }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    private loggedIn: boolean = false;

    setLoggedIn(status: boolean) {
      localStorage.setItem('loggedIn', JSON.stringify(status));
    }
  
    isLoggedIn() {
      return JSON.parse(localStorage.getItem('loggedIn') || 'false');
    }
  
}
