import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { ApiServiceService } from '../../Service/api-service.service';

@Component({
  selector: 'app-orderlist',
  standalone: false,
  
  templateUrl: './orderlist.component.html',
  styleUrl: './orderlist.component.css'
})
export class OrderlistComponent {
  Orderreports:any=[];

  constructor(private http: HttpClient,private authService: AuthService,private apiService:ApiServiceService){}
  
  ngOnInit() {
  this.apiService.getOrderReport().subscribe(
    (response:any)=>{
      this.Orderreports =response.data;
      console.log(this.Orderreports)
    },(error:any)=>{
      console.error('error')
    }
  )
  throw new Error('Method not implemented.');
  }
}
