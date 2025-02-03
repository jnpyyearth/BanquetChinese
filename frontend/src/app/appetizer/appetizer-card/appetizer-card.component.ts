import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { ApiServiceService } from '../../Service/api-service.service';
import { OrderService } from '../../Service/order.service';

@Component({
  selector: 'app-appetizer-card',
  standalone: false,
  
  templateUrl: './appetizer-card.component.html',
  styleUrl: './appetizer-card.component.css'
})
export class AppetizerCardComponent implements OnInit{
  appetizers:any=[];
    constructor(private http: HttpClient,private authService: AuthService,private apiService:ApiServiceService,private OrderService: OrderService){}
    ngOnInit(): void {
      this.apiService.getAppetizer().subscribe(
        (response:any)=>{
          this.appetizers =response.data;
          console.log("Appetizers data:", this.appetizers);
          console.log(this.appetizers)
        },(error:any)=>{
          console.error('error')
        }
      )
    }



}
