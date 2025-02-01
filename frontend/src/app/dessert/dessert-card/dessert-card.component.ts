import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { ApiServiceService } from '../../Service/api-service.service';

@Component({
  selector: 'app-dessert-card',
  standalone: false,
  
  templateUrl: './dessert-card.component.html',
  styleUrl: './dessert-card.component.css'
})
export class DessertCardComponent implements OnInit{
  desserts:any=[];
  constructor(private http: HttpClient,private authService: AuthService,private apiService:ApiServiceService){}
    ngOnInit(): void {
      this.apiService.getDessert().subscribe(
        (response:any)=>{
          this.desserts =response.data;
          console.log(this.desserts)
        },(error:any)=>{
          console.error('error')
        }
      )
    }
}
