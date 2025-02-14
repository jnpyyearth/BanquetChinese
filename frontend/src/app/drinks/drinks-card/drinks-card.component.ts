import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { ApiServiceService } from '../../Service/api-service.service';
import { OrderService } from '../../Service/order.service';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-drinks-card',
  standalone: false,
  
  templateUrl: './drinks-card.component.html',
  styleUrl: './drinks-card.component.css'
})
export class DrinksCardComponent implements OnInit {
  drinks: any = [];
  selectedMenus: any[] = [];
  
      constructor(private http: HttpClient,private authService: AuthService,private apiService:ApiServiceService,private OrderService: OrderService,){}
    
      ngOnInit(): void {
        // ✅ Subscribe ข้อมูลที่ถูกเลือกจาก OrderService เพื่อให้ UI อัปเดตอัตโนมัติ
      this.OrderService.getOrderDataObservable().subscribe(items => {
        this.selectedMenus = (items && Array.isArray(items.menus)) ? items.menus : [];
      });
       
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

    toggleSelection(item: any, event: any) {
      console.log("🖱️ กดเลือก:", item);
    
      if (event.target.checked) {
        this.OrderService.addMenu(item);
      } else {
        this.OrderService.removeMenu(item.menu_ID);
      }
      // อัปเดต UI
    
      console.log("📋 รายการปัจจุบัน:", this.selectedMenus);
    }
    

    isChecked(menuId: number): boolean {
      return Array.isArray(this.selectedMenus) && this.selectedMenus.some(item => item.menu_ID === menuId);// ✅ ตรวจสอบค่าจาก selectedMenus
    }
}
