import { Component, OnInit } from '@angular/core';
import { OrderService } from '../Service/order.service';
import { ApiServiceService } from '../Service/api-service.service';
import { response } from 'express';
import { table } from 'console';
import { AuthService } from '../Service/auth.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-confirm-order',
  standalone: false,
  
  templateUrl: './confirm-order.component.html',
  styleUrl: './confirm-order.component.css'

  
})
export class ConfirmOrderComponent implements OnInit {
  orderData:any|null=null;
  selectedTable:any|null=null;
  finalPrice: number | null = null;
  tableAmount: number | null = null;
  username:string|null=null;
  menuData:any|null=null;
  constructor(private orderservice:OrderService,private apiService:ApiServiceService,private authService:AuthService,private router: Router){}
  ngOnInit(){
    this.username = this.authService.getUsername()
    console.log("hello username:",this.username);
    const selectedMenus =JSON.parse(localStorage.getItem('selectedMenus')||'{}');
    
    if(selectedMenus){
      const sumMenuPrice =selectedMenus.menus.reduce((sum:number,item:any)=>sum+(item.menu_Price||0),0);
        // จัดรูปแบบข้อมูลให้ตรงกับโครงสร้าง API
      this.menuData ={
        menu_name:selectedMenus.menus.map((item: any) => ({
          menu_name: item.menu_Name
          
        }))
      }
        console.log("menu_name:",this.menuData)
      
        this.orderData = {
          contact_Name:selectedMenus.contact_Name||'',
          username: this.username || '',
          province: selectedMenus.province || '',
          placeEvent: selectedMenus.place|| '',
          guestAmount: selectedMenus.guestamount || 0,
          orderdate:new Date().toLocaleDateString('en-CA'),
          eventdate: selectedMenus.date || '',
          table_ID: selectedMenus.id || 0,
          sumMenuPrice: sumMenuPrice,
          phone:selectedMenus.phone,
          orderDetails: selectedMenus.menus.map((item: any) => ({
            menu_ID: item.menu_ID
            
          }))
        };
        console.log("check table_ID",this.orderData.table_ID)
        this.apiService.getTableByID(this.orderData.table_ID).subscribe(
        
          (response:any)=>{
             this.selectedTable=response.data
             console.log("table data =",this.selectedTable)
             console.log("Table Price:", this.selectedTable?.table_Price);
             console.log("Sum Menu Price:", this.orderData?.sumMenuPrice);
             console.log("Guest Amount:", this.orderData?.guestAmount);
             console.log("Table Size:", this.selectedTable?.table_Size);
              this.tableAmount = Math.ceil(this.orderData.guestAmount/this.selectedTable.table_Size);
              console.log("tableAmount",this.tableAmount);
             this.finalPrice = ((Number(this.selectedTable.table_Price))) * (this.tableAmount);
             console.log("final price is: ",this.finalPrice)
             
            


          },(erorr:any)=>{
            console.error("erorr:",erorr)
          }
        )
        
    }
    
    
    
  }

  
  sendOrder() {
    if (!this.orderData) {
      console.error("❌ Error: Missing order data");
      return;
    }
  
    this.apiService.addOrder(this.orderData).subscribe(
      (response) => {
        console.log("🎉 Order successfully sent!", response);
        
        Swal.fire({
          title: 'ท่านชำระเงินเสร็จเรียบร้อยแล้ว',
          text: `ขอบคุณสำหรับการจองของท่าน ครับ/ค่ะ`,
          icon: 'success',
          confirmButtonText: 'ตกลง',
        });
      },
      (error) => {
        Swal.fire('failed', 'confirmorder failed!', 'error');
        console.log(error)
      }
    );
  }


  paymentUrl: string = `https://promptpay.io/0823177345/${this.finalPrice}`;

  popup() {
    Swal.fire({
      title: 'ยืนยันการสั่งซื้อ',
      text: 'กรุณาตรวจสอบรายละเอียดให้ถูกต้องก่อนยืนยัน',
      imageUrl: this.paymentUrl,
      imageWidth: 200,
      imageHeight: 200,
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.sendOrder(); 
        this.router.navigate(['/mainpage']);
      }
    });
  }
  
  
  
}
