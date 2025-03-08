
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderData: any = {
    contact_Name: '',
    province: '',
    placeEvent: '',
    guestAmount: 0,
    orderdate: '',
    eventdate: '',
    phone:'',
    table_ID: 0,
    menus: []
  };

  private orderData$ = new BehaviorSubject<any>(this.orderData); // ✅ ใช้ BehaviorSubject เพื่อให้ UI อัปเดตอัตโนมัติ

  constructor() {
    this.loadFromLocalStorage(); // ✅ โหลดข้อมูลจาก LocalStorage เมื่อเริ่มแอป
  }

  /** 📌 ✅ เพิ่มข้อมูลผู้ใช้ (ชื่อ, จังหวัด, สถานที่จัดงาน ฯลฯ) */
  setUserInfo(userInfo: any) {
    this.orderData = { ...this.orderData, ...userInfo };
    this.saveToLocalStorage();
    this.orderData$.next(this.orderData);
  }

  /** 📌 ✅ เพิ่มเมนูอาหาร */
  addMenu(item: any) {
    if (!this.orderData.menus.some((i: any) => i.menu_ID === item.menu_ID)) {
      this.orderData.menus.push(item);
      this.saveToLocalStorage();
      this.orderData$.next(this.orderData); // ✅ อัปเดต UI หลังเพิ่มเมนู
    }
  }

  /** 📌 ✅ ลบเมนูอาหารออกจากรายการ */
  removeMenu(menuId: number) {
    this.orderData.menus = this.orderData.menus.filter((item: any) => item.menu_ID !== menuId);
    this.saveToLocalStorage();
    this.orderData$.next(this.orderData);
  }

  /** 📌 ✅ ล้างข้อมูลทั้งหมด (ล้างทั้งเมนูและข้อมูลผู้ใช้) */
  clearOrder() {
    this.orderData = {
      username: '',
      province: '',
      placeEvent: '',
      guestAmount: 0,
      orderdate: '',
      eventdate: '',
      table_ID: 0,
      menus: []
    };
    this.saveToLocalStorage();
    this.orderData$.next(this.orderData);
  }

  /** 📌 ✅ ดึงข้อมูลออเดอร์ */
  getOrderData() {
    return this.orderData;
  }

  /** 📌 ✅ ดึงข้อมูลเป็น Observable เพื่อใช้กับ UI */
  getOrderDataObservable() {
    return this.orderData$.asObservable();
  }

  /** 📌 ✅ บันทึกลง LocalStorage */
  private saveToLocalStorage() {
    console.log("บันทึกข้อมูลลง localStorage:", this.orderData);
    localStorage.setItem('selectedMenus', JSON.stringify(this.orderData));
  }

  /** 📌 ✅ โหลดข้อมูลจาก LocalStorage */
  private loadFromLocalStorage() {
    const storedData = localStorage.getItem('selectedMenus');
    if (storedData) {
      this.orderData = JSON.parse(storedData);
      this.orderData$.next(this.orderData); // ✅ อัปเดต UI หลังโหลดข้อมูลจาก LocalStorage
    }
  }
}
