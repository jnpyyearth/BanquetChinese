import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { ApiServiceService } from '../../Service/api-service.service';
import { OrderService } from '../../Service/order.service';


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
      this.OrderService.getSelectedItemsObservable().subscribe(items => {
        this.selectedMenus = items;
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
        this.OrderService.addItem(item);
      } else {
        this.OrderService.removeItem(item.menu_ID);
      }
      this.selectedMenus = this.OrderService.getSelectedItems(); // อัปเดต UI
    
      console.log("📋 รายการปัจจุบัน:", this.OrderService.getSelectedItems());
    }
    

    isChecked(menuId: number): boolean {
      return this.selectedMenus.some(item => item.menu_ID === menuId); // ✅ ตรวจสอบค่าจาก selectedMenus
    }
}
