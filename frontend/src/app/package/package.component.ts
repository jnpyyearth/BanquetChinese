import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../Service/api-service.service';
import { OrderService } from '../Service/order.service';

@Component({
  selector: 'app-package',
  standalone: false,
  
  templateUrl: './package.component.html',
  styleUrl: './package.component.css'
})
export class PackageComponent {
  selectedMenus: any[] = []; // เก็บแพ็กเกจที่เลือก
  tablesize:any=[];

  constructor(private http: HttpClient,private apiService:ApiServiceService,private OrderService: OrderService){}

  ngOnInit(): void {

    this.apiService.getTable().subscribe(
      (response:any)=>{
        this.tablesize = response.data.map((item: any) => {
          // เปลี่ยนชื่อที่จะแสดงผล
          if (item.id === 1) {
            item.name = 'S'  // เปลี่ยนชื่อที่จะแสดง
          } else if (item.id === 2) {
            item.name = 'M';
          } else if (item.id === 3) {
            item.name = 'L'
          }
          return item;
        });
        console.log("tablesize data:", this.tablesize);
        console.log(this.tablesize)

      },(error:any)=>{
        console.error('error')
      }
    )
  }




  toggleSelection(item: any) {
  console.log("🖱️ กดเลือก:", item);

  // รีเซ็ตค่าเก่า (เลือกได้ทีละ 1 อัน)
  this.selectedMenus = [];
  this.OrderService.clearTables(); // เพิ่มเมธอดนี้ใน OrderService

  // เพิ่มข้อมูลใหม่
  this.OrderService.addtable(item);

  // อัปเดตรายการที่เลือก
  this.selectedMenus = this.OrderService.getSelectedItems();
  console.log("📋 รายการที่เลือก:", this.selectedMenus);
}

  
 
  

  isChecked(tableId: number): boolean {
    return this.selectedMenus.some(item => item.id === tableId);
  }
  
  
  
  
}
