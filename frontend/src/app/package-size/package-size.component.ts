import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators , FormBuilder } from '@angular/forms';
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
  selectedDate: string | null = null;
  showCalendar = false;
  form: any;

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

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
    console.log("📆 Toggle Calendar:", this.showCalendar);
  }

  // onDateSelected(date: string) {
  //   console.log("📌 วันที่ที่เลือก:", date);
  //   this.selectedDate = date;
  //   this.packageform.patchValue({ date }); 
  //   this.closeCalendarModal(); 
  // }
   

  onDateSelected(date: string) {
    console.log("📌 วันที่ที่เลือก (ค่าจาก Calendar):", date);
    // ใช้ new Date() เพื่อแปลงค่าวันที่ให้ถูกต้อง
    const selectedDateObj = new Date(date + 'T00:00:00'); // ใช้เวลาเที่ยงคืนเพื่อป้องกัน TimeZone Error
    const localDate = new Date(selectedDateObj.getTime() - selectedDateObj.getTimezoneOffset() * 60000);
    // แปลงเป็น "YYYY-MM-DD" เพื่อให้ตรงกับ input text
    const formattedDate = localDate.toISOString().split('T')[0];
    console.log("วันที่ที่เลือก (แก้ไขแล้ว):", formattedDate);
    this.selectedDate = formattedDate; // อัปเดตค่าที่ input
    this.packageform.patchValue({ date: formattedDate }); // อัปเดตฟอร์ม
    this.closeCalendarModal();
  }

  
  
  openCalendarModal() {
    this.showCalendar = true;
  }
  
  closeCalendarModal() {
    this.showCalendar = false;
  }



  
}
