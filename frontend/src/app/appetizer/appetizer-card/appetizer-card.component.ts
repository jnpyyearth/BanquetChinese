import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { ApiServiceService } from '../../Service/api-service.service';
import { OrderService } from '../../Service/order.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-appetizer-card',
  standalone: false,
  
  templateUrl: './appetizer-card.component.html',
  styleUrl: './appetizer-card.component.css'
})
export class AppetizerCardComponent implements OnInit{
  appetizers:any=[];
  selectedMenus: any[] = [];

    constructor(private http: HttpClient,private authService: AuthService,private apiService:ApiServiceService,private OrderService: OrderService,){}


    ngOnInit(): void {

      // ✅ Subscribe ข้อมูลที่ถูกเลือกจาก OrderService เพื่อให้ UI อัปเดตอัตโนมัติ
      this.OrderService.getOrderDataObservable().subscribe(items => {
        this.selectedMenus = Array.isArray(items.menus) ? items.menus : [];   
      });


      this.apiService.getAppetizer().subscribe(
        (response:any)=>{
          this.appetizers =response.data;
          console.log("Appetizers data:", this.appetizers);
          console.log(this.appetizers)

        },(error:any)=>{
          console.error('error')
        }
      )
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
      //return true false  check ว่ามี selected menu ใช่มั้ย 
      return Array.isArray(this.selectedMenus) && this.selectedMenus.some(item => item.menu_ID === menuId); 
    }
    
    
  
   
  
  
}