import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { ApiServiceService } from '../../Service/api-service.service';

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
      this.apiService.getDrink().subscribe(
        (response: any) => {
          this.drinks = response.data;
          console.log(this.drinks);
        },
        (error: any) => {
          console.error('error');
        }
      );
    }
}
