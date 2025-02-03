import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { ApiServiceService } from '../../Service/api-service.service';

@Component({
  selector: 'app-maindish-card',
  standalone: false,
  
  templateUrl: './maindish-card.component.html',
  styleUrl: './maindish-card.component.css'
})

export class MaindishCardComponent implements OnInit{
  maindishes:any=[];
  constructor(private http: HttpClient,private authService: AuthService,private apiService:ApiServiceService){}
  ngOnInit(): void {
    this.apiService.getMainDish().subscribe(
      (response:any)=> {
        this.maindishes = response.data;
        console.log(this.maindishes)
      },(error:any)=>{
        console.error('error')
      }
    )
  }
}
