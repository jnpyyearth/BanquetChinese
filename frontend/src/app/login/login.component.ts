import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {AuthService} from '../Service/auth.service'
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
  
})
export class LoginComponent implements OnInit {
[x: string]: any;
loginForm!: FormGroup;
showPassword: boolean = false; 
errorMessage:string ='';
userRole:string|null =null;
constructor(private fb:FormBuilder,private http: HttpClient,private router: Router,private authService:AuthService){}
ngOnInit(){

  document.body.classList.add('login-page');

  const token = localStorage.getItem('token');// check token 
  if(token){
    this.userRole =this.authService.getRole();
    this.navigateBaseOnRole();
  }
  this.loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
}


ngOnDestroy() {
  document.body.classList.remove('login-page');
}

onLogin():void{
  
  const loginData = this.loginForm.value;
  //ยิงapi
  console.log(loginData)
  this.http.post<{token:string}>('http://localhost:5014/api/Login/login',loginData)
  .subscribe({
    next:(response)=>{
      console.log("hello response")
      if(response.token){
        this.authService.login(response.token);
        this.userRole =this.authService.getRole();
        this.navigateBaseOnRole();
        console.log("route เเล้ว")
      }else{
        this.errorMessage ='Login failed. Invaild token.';
      }
    }
  })
}
  private navigateBaseOnRole():void{
    console.log("yourRole: ",this.userRole);
    if(this.userRole ==='customer'){
      this.router.navigate(['/mainpage'], { state: { loggedIn: true } }).then(() => {

     // ซน
     this.authService.setLoggedIn(true);
     console.log('Navigated to home');
    });

    }else if(this.userRole ==='manager'){
      this.router.navigate(['/addmenu'])
      console.log("route to addmenu")
      
    }else {
      console.log("cannot route")
      this.errorMessage = 'Unknown role. Cannot navigate.';
    }
  }
}

