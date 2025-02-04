import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { ApiServiceService } from '../../Service/api-service.service';
import { map } from 'rxjs/operators';

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
    this.apiService.getMainDish()
  .pipe(
    map((response: any) => {
      console.log("Raw API response:", response);
      return Array.isArray(response.data) ? response.data.filter((maindish:any) => maindish.menu_Status === 0) : [];
    })
  )
  .subscribe(filterMenu => {
    this.maindishes = filterMenu;
    console.log('Filtered data:', this.maindishes);
  });

}}
