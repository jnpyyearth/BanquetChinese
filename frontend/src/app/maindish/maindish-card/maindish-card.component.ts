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
    this.OrderService.getSelectedItemsObservable().subscribe(items => {
      this.selectedMenus = items;
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
  //   this.apiService.getMainDish()
  // .pipe(
  //   map((response: any) => {
  //     console.log("Raw API response:", response);
  //     return Array.isArray(response.data) ? response.data.filter((maindish:any) => maindish.menu_Status === 0) : [];
  //   })
  // )
  // .subscribe(filterMenu => {
  //   this.maindishes = filterMenu;
  //   console.log('Filtered data:', this.maindishes);
  // });


