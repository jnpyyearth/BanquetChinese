import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { ApiServiceService } from '../../Service/api-service.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-drinks-card',
  standalone: false,
  
  templateUrl: './drinks-card.component.html',
  styleUrl: './drinks-card.component.css'
})
export class DrinksCardComponent implements OnInit {
  drinks: any = [];
  constructor(private http: HttpClient, private authService: AuthService, private apiService: ApiServiceService) { }
    ngOnInit(): void {
      this.apiService.getDrink()
       .pipe(
         map((response: any) => {
           console.log("Raw API response:", response);
           return Array.isArray(response.data) ? response.data.filter((drink:any) => drink.menu_Status === 0) : [];
         })
       )
       .subscribe(filterMenu => {
         this.drinks = filterMenu;
         console.log('Filtered data:', this.drinks);
       });
    }
}
