import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { ApiServiceService } from '../../Service/api-service.service';
import { map } from 'rxjs/operators';

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
      this.apiService.getDessert()
       .pipe(
         map((response: any) => {
           console.log("Raw API response:", response);
           return Array.isArray(response.data) ? response.data.filter((dessert:any) => dessert.menu_Status === 0) : [];
         })
       )
       .subscribe(filterMenu => {
         this.desserts = filterMenu;
         console.log('Filtered data:', this.desserts);
       });
    }
}
