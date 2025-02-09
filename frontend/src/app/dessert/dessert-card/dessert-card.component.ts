import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { ApiServiceService } from '../../Service/api-service.service';
import { OrderService } from '../../Service/order.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dessert-card',
  standalone: false,
  
  templateUrl: './dessert-card.component.html',
  styleUrl: './dessert-card.component.css'
})
export class DessertCardComponent implements OnInit{
  desserts:any=[];
  selectedMenus: any[] = [];

      constructor(private http: HttpClient,private authService: AuthService,private apiService:ApiServiceService,private OrderService: OrderService,){}
  
      ngOnInit(): void {

        this.OrderService.getOrderDataObservable().subscribe(items => {
          this.selectedMenus =Array.isArray(items.menus) ? items.menus : [];   
        });

        this.apiService.getDessert().subscribe(
          (response:any)=>{
            this.desserts =response.data;
            console.log(this.desserts)
          },(error:any)=>{
            console.error('error')
          }
        )
        throw new Error('Method not implemented.');
        }
  

     

      

    toggleSelection(item: any, event: any) {
      console.log("🖱️ กดเลือก:", item);
    
      if (event.target.checked) {
        this.OrderService.addMenu(item);
      } else {
        this.OrderService.removeMenu(item.menu_ID);
      }
       
    
      console.log("📋 รายการปัจจุบัน:", this.selectedMenus);
    }
    

    isChecked(menuId: number): boolean {
      return Array.isArray(this.selectedMenus) && this.selectedMenus.some(item => item.menu_ID === menuId); // ✅ ตรวจสอบค่าจาก selectedMenus
  
    
    }
  }

