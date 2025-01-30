
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import {ApiServiceService} from '../Service/api-service.service'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
registerForm!: FormGroup;
errorMessage:string ='';
constructor(private fb:FormBuilder,private http: HttpClient,private router: Router,private authService:AuthService,private apiService:ApiServiceService){}
ngOnInit(): void {

     this.registerForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        firstname:['',Validators.required],
        lastname:['',Validators.required],
        confirmPassword: ['', Validators.required],
        phone:['',Validators.required],
        email:['',Validators.required]
      },);

      
}


onRegis(){
  if (this.registerForm.invalid) {
    console.log('invlide register Form')
    return;
  }
  const regisData =this.registerForm.value;
  console.log(regisData)
  this.apiService.Register(regisData).subscribe(
    (response:any)=>{
      console.log('Response from server:', response);
      if(response.status ===200){
        this.registerForm.reset();
      Swal.fire('success', 'Registration succesccfully!', 'success');
      }
      
    },(error:any)=>{
      console.error('Error register',error);
      if(error.status ===402){
        Swal.fire('failed', 'confirmpassword unmatch !', 'error');
      }else{
        Swal.fire('failed', 'can not  registration', 'error');
      }
      
    }
  )
}


}
