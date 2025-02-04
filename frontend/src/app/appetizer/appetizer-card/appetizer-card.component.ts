import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { ApiServiceService } from '../../Service/api-service.service';
import { OrderService } from '../../Service/order.service';
import { map } from 'rxjs/operators';

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
      this.apiService.getAppetizer()
             .pipe(
               map((response: any) => {
                 console.log("Raw API response:", response);
                 return Array.isArray(response.data) ? response.data.filter((appetizer:any) => appetizer.menu_Status === 0) : [];
               })
             )
             .subscribe(filterMenu => {
               this.appetizers = filterMenu;
               console.log('Filtered data:', this.appetizers);
             });
    }



}
