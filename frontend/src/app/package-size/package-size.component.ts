import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { OrderService } from '../Service/order.service';

@Component({
  selector: 'app-package-size',
  standalone: false,
  templateUrl: './package-size.component.html',
  styleUrls: ['./package-size.component.css']
})
export class PackageSizeComponent {
  selectedMenus: any[] = [];
  packageform: FormGroup;

  constructor(private router: Router, private OrderService: OrderService) {
    // ✅ โหลดข้อมูลจาก LocalStorage
    const storedData = localStorage.getItem('formData');
    const parsedData = storedData ? JSON.parse(storedData) : {};

    this.packageform = new FormGroup({
      contact_Name: new FormControl(parsedData.contact_Name || '', Validators.required),
      province: new FormControl(parsedData.province || '', Validators.required),
      place: new FormControl(parsedData.place || '', Validators.required),
      date: new FormControl(parsedData.date || '', Validators.required),
      phone: new FormControl(parsedData.phone || '', Validators.required),
      guestamount:new FormControl(parsedData.guestamount||'',Validators.required)
    });
  }

  ngOnInit() {
    // ✅ โหลด selectedMenus จาก localStorage
    const storedMenus = localStorage.getItem('selectedMenus');
    if (storedMenus) {
      this.selectedMenus = JSON.parse(storedMenus);
    }
    console.log("📋 โหลดข้อมูลจาก localStorage:", this.selectedMenus);
  }

  
 
  onSubmit() {
    if (this.packageform.invalid) {
      Swal.fire({
        title: "กรุณากรอกข้อมูลให้ครบ",
        icon: "warning",
      });
      return;
    }
  
    // ✅ ล้างข้อมูลเก่าก่อนบันทึกใหม่ (เพื่อป้องกันการซ้อนทับ)
    localStorage.removeItem('formData');
  
    // ✅ บันทึกฟอร์มใหม่แทนที่ของเก่า
    const formData = this.packageform.value;
    localStorage.setItem('formData', JSON.stringify(formData));
  
    // ✅ ตรวจสอบว่า LocalStorage ถูกแทนที่จริงหรือไม่
    console.log("📌 Form Data ที่บันทึกลง LocalStorage:", localStorage.getItem('formData'));
  
    Swal.fire({
      title: "success",
      icon: "success",
      text: "เยี่ยมมาก ไปเลือกเมนูอาหารกัน",
      draggable: true
    }).then(() => {
      
      this.OrderService.setUserInfo(formData);
      this.router.navigate(['/maindish']);
    });
  }
   
}
