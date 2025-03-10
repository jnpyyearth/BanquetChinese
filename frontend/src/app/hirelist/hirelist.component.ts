import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../Service/api-service.service';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-hirelist',
  standalone: false,
  
  templateUrl: './hirelist.component.html',
  styleUrl: './hirelist.component.css'
})
export class HirelistComponent implements OnInit{
hireList: any[]=[];
User_ID:any;
 constructor(private http: HttpClient,private authService: AuthService,private apiService:ApiServiceService){}
  ngOnInit(){
    this.User_ID =this.authService.getUser_ID();
    console.log(`this User_ID${this.User_ID}`);
    if(this.User_ID){
      this.apiService.GetMyOrder(this.User_ID).subscribe({
        next:(response)=>{
          this.hireList=response
          console.log(this.hireList)
        },
        error:(error)=>{
          console.error(" API Error:", error);
        }
      })
    }
  }

}
