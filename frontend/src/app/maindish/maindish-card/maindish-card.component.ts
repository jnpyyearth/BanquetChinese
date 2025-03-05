import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { ApiServiceService } from '../../Service/api-service.service';
import { OrderService } from '../../Service/order.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

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
      (response: any) => {
        console.log("🟢 API Response:", response);
        this.maindishes = response.data;
        console.log("🟢 Successfully received data:", this.maindishes);
      }, (error: any) => {
        console.error("🔴 API Error:", error);
        console.error('error')
      }
    )
  }

  toggleSelection(item: any, event: any) {
    console.log("🖱️ กดเลือก:", item);
    const orderData = this.OrderService.getOrderData();
    const table_ID = orderData?.id || 0;

    console.log(" Table_ID ที่ได้จาก LocalStorage:", table_ID);
    let maxMenuSelection = 999;
    if (table_ID === 1) maxMenuSelection = 5;
    else if (table_ID === 2) maxMenuSelection = 6;
    else if (table_ID === 3) maxMenuSelection = 8;

    // ✅ ตรวจสอบจำนวนเมนูที่เลือกแล้วใน OrderService
    const selectedMenus = this.OrderService.getOrderData().menus || [];
    const currentCount = selectedMenus.filter((menu:any) => menu.menu_Type === "maindish").length;
    console.log(`maindish count =${currentCount}`)

    if (event.target.checked) {
      this.OrderService.addMenu(item); // ✅ ใช้ addMenu() แทน addItem()
    } else {
      this.OrderService.removeMenu(item.menu_ID); //ลบเมนูออก
    }

    console.log("📋 รายการปัจจุบัน:", this.selectedMenus);
  }
  

  isChecked(menuId: number): boolean {
    return Array.isArray(this.selectedMenus) && this.selectedMenus.some(item => item.menu_ID === menuId);
  }

}


