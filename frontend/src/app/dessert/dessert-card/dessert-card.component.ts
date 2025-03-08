import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { ApiServiceService } from '../../Service/api-service.service';
import { OrderService } from '../../Service/order.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

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
     const orderData = this.OrderService.getOrderData();
        const table_ID = orderData?.id || 0;
    
        console.log(" Table_ID ที่ได้จาก LocalStorage:", table_ID);
        let maxMenuSelection = 999;
        if (table_ID === 1) maxMenuSelection = 1;
        else if (table_ID === 2) maxMenuSelection = 2;
        else if (table_ID === 3) maxMenuSelection = 2;
    
        // ✅ ตรวจสอบจำนวนเมนูที่เลือกแล้วใน OrderService
        const selectedMenus = this.OrderService.getOrderData().menus || [];
        const currentCount = selectedMenus.filter((menu:any) => menu.menu_Type === "dessert").length;
        console.log(`dessert count =${currentCount}`)
    
        if (event.target.checked) {
          if (currentCount>= maxMenuSelection) {
    
            event.target.checked = false;
            Swal.fire({
              title: `packageที่ ${table_ID} เลือกจานของหวานได้ไม่เกิน ${maxMenuSelection} เมนู`,
              icon: "error",
            });
            return;
          }
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

