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
  maindishes:any=[];
  selectedMenus: any[] = [];
  
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
      if (this.selectedMenus.length >= 2) {
        Swal.fire({
          icon: 'warning',
          title: 'เลือกได้สูงสุด 2 เมนู!',
          text: 'คุณไม่สามารถเลือกเมนูมากกว่า 2 รายการได้',
          confirmButtonText: 'ตกลง'
        }).then(() => {
          // ลบเมนูล่าสุดที่เลือกออก
          event.target.checked = false;
          this.OrderService.removeMenu(item.menu_ID);
          console.log("ลบเมนูที่กดเลือกล่าสุด:");
      });
      return;
      }
      this.OrderService.addMenu(item); //เพิ่มเมนุ
    } else {
      this.OrderService.removeMenu(item.menu_ID); //ลบเมนูออก
    }

    console.log("📋 รายการปัจจุบัน:", this.selectedMenus);
  }
  

  isChecked(menuId: number): boolean {
    return Array.isArray(this.selectedMenus) && this.selectedMenus.some(item => item.menu_ID === menuId);
  }
  
}
 

