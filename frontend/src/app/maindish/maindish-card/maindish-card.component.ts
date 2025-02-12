import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { ApiServiceService } from '../../Service/api-service.service';
import { OrderService } from '../../Service/order.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-maindish-card',
  standalone: false,
  
  templateUrl: './maindish-card.component.html',
  styleUrl: './maindish-card.component.css'
})

export class MaindishCardComponent implements OnInit{
  maindishes:any=[];selectedMenus: any[] = [];
  
      constructor(private http: HttpClient,private authService: AuthService,private apiService:ApiServiceService,private OrderService: OrderService,){}
  
  ngOnInit(): void {

    // ✅ Subscribe ข้อมูลที่ถูกเลือกจาก OrderService เพื่อให้ UI อัปเดตอัตโนมัติ
    this.OrderService.getOrderDataObservable().subscribe(data => {
      this.selectedMenus = (data && Array.isArray(data.menus)) ? data.menus : []; 
    });

    this.apiService.getMainDish().subscribe(
      (response:any)=>{
        console.log("🟢 API Response:", response);
        this.maindishes =response.data;
        console.log("🟢 Successfully received data:", this.maindishes);
      },(error:any)=>{
        console.error("🔴 API Error:", error);
        console.error('error')
      }
    )
  }

  toggleSelection(item: any, event: any) {
    console.log("🖱️ กดเลือก:", item);

    if (event.target.checked) {
      this.OrderService.addMenu(item); // ✅ ใช้ addMenu() แทน addItem()
    } else {
      this.OrderService.removeMenu(item.menu_ID); // ✅ ใช้ removeMenu()
    }

    // ✅ ไม่ต้องเรียก getOrderData() เพราะ UI อัปเดตอัตโนมัติผ่าน Observable
    console.log("📋 รายการปัจจุบัน:", this.selectedMenus);
  }

  isChecked(menuId: number): boolean {
    return Array.isArray(this.selectedMenus) && this.selectedMenus.some(item => item.menu_ID === menuId);
  }
  
}
 

