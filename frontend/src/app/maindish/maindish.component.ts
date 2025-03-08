import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-maindish',
  standalone: false,
  templateUrl: './maindish.component.html',
  styleUrl: './maindish.component.css'
})
export class MaindishComponent implements OnInit {
  selectedMenus: any[] = [];
  OrderService: any;


  constructor(private router: Router) {}

  ngOnInit(): void {
    // ✅ ดึงข้อมูลล่าสุดจาก OrderService ให้ UI อัปเดตอัตโนมัติ
    this.OrderService.getOrderDataObservable().subscribe((data: { menus: any[]; }) => {
      this.selectedMenus = (data && Array.isArray(data.menus)) ? data.menus : [];
      console.log("📋 อัปเดตเมนูที่เลือก:", this.selectedMenus);
    });
  }

  goToNextPage() {
    if (this.selectedMenus.length > 2) {
     Swal.fire({
              icon: 'warning',
              title: 'เลือกเพิ่มได้สูงสุด 2 เมนู!',
              text: 'ไม่สามารถเลือกเมนูมากกว่า 2 เมนูได้',
              confirmButtonText: 'ตกลง'
            });
      return; //ไม่ให้เปลี่ยนหน้า
    }

    // ถ้าเลือกครบ 3 เมนูแล้ว ไปหน้าถัดไป
    this.router.navigate(['/appetizer']);
  }
}

