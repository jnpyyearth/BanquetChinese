import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { ApiServiceService } from '../../Service/api-service.service';
import { OrderService } from '../../Service/order.service';

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

        this.OrderService.getSelectedItemsObservable().subscribe(items => {
          this.selectedMenus = items;
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


