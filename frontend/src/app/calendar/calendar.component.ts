// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { ApiServiceService } from '../Service/api-service.service';
// import { OrderService } from '../Service/order.service'; 
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-calendar',
//   standalone: false,
//   templateUrl: './calendar.component.html',
//   styleUrls: ['./calendar.component.css']
// })
// export class CalendarComponent implements OnInit {
//   @Input() selectedDate: string | null = null; // รับค่าจาก input[type="date"]
//   @Output() dateSelected = new EventEmitter<string>(); // ส่งค่าไปเมื่อเลือกวันที่
//   currentDate = new Date();
//   days: { date: Date; isToday: boolean; isBooked: boolean }[] = [];
//   bookedDates: string[] = ["2025-03-10", "2025-03-15", "2025-03-20"];
//   showCalendar = true; 
//   minDate = new Date(); // ป้องกันการเลือกวันที่ก่อนวันนี้
//   disabledDates: string[] = [];
//   isInvalidDate: boolean = false;

//   constructor(private apiService:ApiServiceService){
//     this.updateCalendar();
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     tomorrow.setHours(0, 0, 0, 0); //ให้ minDate เป็นพรุ่งนี้ เวลา 00:00:00 (ป้องกัน TimeZone Issue)
//     this.minDate = tomorrow;
   
//   }

//   ngOnInit(): void {
//     this.apiService.getOrderReport().subscribe((response: any) => {
//       this.disabledDates = response.data.map((order: any) =>
//         order.eventdate.split('T')[0] // ดึงเฉพาะ YYYY-MM-DD
//       );
//       console.log('วันที่ห้ามเลือก:', this.disabledDates);
//     });
//   }


//   updateCalendar() {
//     const currentMonth = this.currentDate.getMonth();
//     const currentYear = this.currentDate.getFullYear();
//     const firstDay = new Date(currentYear, currentMonth, 1);
//     const lastDay = new Date(currentYear, currentMonth + 1, 0);
//     const totalDays = lastDay.getDate();
//     const firstDayIndex = firstDay.getDay();

//     this.days = [];
//     // เพิ่มวันก่อนหน้าให้เต็มแถว
//     for (let i = 0; i < firstDayIndex; i++) {
//       const prevDate = new Date(currentYear, currentMonth, -i);
//       this.days.unshift({ date: prevDate, isToday: false, isBooked: false });
//     }

//     // เพิ่มวันที่ในเดือนปัจจุบัน
//     for (let i = 1; i <= totalDays; i++) {
//       const date = new Date(currentYear, currentMonth, i);
//       const dateString = date.toISOString().split('T')[0];
//       const isToday = date.toDateString() === new Date().toDateString();
//       const isBooked = this.bookedDates.includes(dateString);
  
//       this.days.push({ date, isToday, isBooked });
//     }
//   }

//   changeMonth(direction: number) {
//     this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + direction, 1);
//     this.updateCalendar();
//   }
  
//   selectDate(date: Date) {
//     console.log("วันที่ที่เลือกก่อนแก้ไข:", date);// แปลงเป็น Local Date โดยไม่ให้เปลี่ยนเป็น UTC

//     if (date < this.minDate) {
//       console.warn("🚨 วันที่เลือกต้องไม่ก่อนวันนี้!");
//       return;
//     }

//     // ✅ ตรวจสอบว่าวันที่ถูกบล็อกจาก API หรือไม่
//   const dateString = date.toISOString().split('T')[0];
//   if (this.disabledDates.includes(dateString)) {
//     console.warn("🚨 วันที่นี้ถูกจองแล้ว!");
//     Swal.fire({
//       title: "ไม่สามารถเลือกวันนี้ได้",
//       icon: "error",
//       text: "วันที่นี้ถูกจองแล้ว กรุณาเลือกวันอื่น",
//     }).then(() => console.log("Alert ถูกแสดงแล้ว!"));
//     return; // ห้ามเลือกวันที่ถูกบล็อก
//   }

// // ✅ ป้องกันการเลือกวันก่อน minDate
// if (date.getTime() < this.minDate.getTime()) {
//   console.warn("🚨 วันที่เลือกต้องไม่ก่อนพรุ่งนี้!");
//   Swal.fire({
//     title: "ไม่สามารถเลือกวันนี้ได้",
//     icon: "warning",
//     text: "กรุณาเลือกวันที่หลังจากพรุ่งนี้",
//   }).then(() => console.log("Alert ถูกแสดงแล้ว!"));

//   return; // ห้ามเลือก
// }

//     const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);// แปลงเป็น "YYYY-MM-DD" โดยไม่ให้เปลี่ยนเป็น UTC
//     this.selectedDate = localDate.toISOString().split('T')[0];
//     console.log("วันที่ที่เลือกหลังแก้ไข:", this.selectedDate);
//     this.dateSelected.emit(this.selectedDate); // ส่งค่าออกไปให้ input[type="date"]
//     this.showCalendar = false; // ซ่อนปฏิทินเมื่อเลือกวันที่แล้ว
//   }
  
//   toggleCalendar() {
//     this.showCalendar = true;
//   }
// }


import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiServiceService } from '../Service/api-service.service';
import { OrderService } from '../Service/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendar',
  standalone: false,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Input() selectedDate: string | null = null;
  @Output() dateSelected = new EventEmitter<string>();
  currentDate = new Date();
  days: { date: Date; isToday: boolean; isBooked: boolean }[] = [];
  bookedDates: string[] = [];
  showCalendar = true;
  minDate = new Date();
  disabledDates: string[] = [];

  constructor(private apiService: ApiServiceService, private orderService: OrderService) {
    this.updateCalendar();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    this.minDate = tomorrow;
  }

  ngOnInit(): void {
    // ดึงข้อมูลที่ถูกจองจาก API
    this.apiService.getOrderReport().subscribe((response: any) => {
      this.disabledDates = response.data
        .map((order: any) => order.eventdate ? order.eventdate.split('T')[0] : null)
        .filter((date: null) => date !== null);
  
      console.log('📅 วันที่ที่ถูกจองจาก API:', this.disabledDates);
      this.updateBookedDates();
    });

    // ดึงข้อมูลจาก OrderService
    this.orderService.getOrderDataObservable().subscribe((order) => {
      if (order.orderdate) {
        this.bookedDates.push(order.orderdate);
      }
      this.updateBookedDates();
    });
  }

  /** อัปเดตรายการวันจองที่ต้องบล็อกไม่ให้จอง */
  updateBookedDates() {
    this.bookedDates = [...new Set([...this.disabledDates])]; // ลบค่าซ้ำออก
    console.log('📅 วันที่ที่ถูกจองทั้งหมด:', this.bookedDates);
    this.updateCalendar();
  }

  /** ✅ อัปเดตปฏิทิน */
  updateCalendar() {
    const currentMonth = this.currentDate.getMonth();
    const currentYear = this.currentDate.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDay.getDate();
    const firstDayIndex = firstDay.getDay();

    this.days = [];

    // ✅ แก้ไขการเพิ่มวันก่อนหน้าให้ถูกต้อง
    for (let i = firstDayIndex - 1; i >= 0; i--) {  
      const prevDate = new Date(currentYear, currentMonth, -i + 1);
      this.days.unshift({ date: prevDate, isToday: false, isBooked: false });
    }

    // เพิ่มวันที่ในเดือนปัจจุบัน
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentYear, currentMonth, i);

      // ตรวจสอบค่า date ว่าถูกต้องก่อนใช้
      if (!date || isNaN(date.getTime())) {
        console.error("Error: Invalid date", date);
        continue;
      }

      const dateString = date.toLocaleDateString('en-CA'); // ป้องกัน Timezone ลดวันไป 1 วัน
      const isToday = date.toDateString() === new Date().toDateString();
      const isBooked = this.bookedDates.includes(dateString);
      this.days.push({ date, isToday, isBooked });
    }
  }

  /*เลือกวันที่ */
  selectDate(date: Date) {
    console.log("วันที่เลือกก่อนแก้ไข:", date);

    if (date < this.minDate) {
      Swal.fire({ title: "ไม่สามารถเลือกวันนี้ได้", icon: "warning", text: "กรุณาเลือกวันที่หลังจากพรุ่งนี้" });
      return;
    }

    const dateString = date.toLocaleDateString('en-CA');
    if (this.bookedDates.includes(dateString)) {
      Swal.fire({ title: "ไม่สามารถเลือกวันนี้ได้", icon: "error", text: "วันที่นี้ถูกจองแล้ว กรุณาเลือกวันอื่น" });
      return;
    }

    this.selectedDate = dateString;
    console.log("วันที่เลือก:", this.selectedDate);
    this.dateSelected.emit(this.selectedDate);
    this.showCalendar = false;
  }

  toggleCalendar() {
    this.showCalendar = true;
  }

  changeMonth(direction: number) {
    // ปรับเดือนของ currentDate
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + direction, 1);
    
    this.updateCalendar(); // อัปเดตปฏิทินเมื่อเปลี่ยนเดือน
  }
}
