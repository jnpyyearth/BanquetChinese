// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class OrderService {
//   private selectedItems: any[] = [];
//   private selectedItems$ = new BehaviorSubject<any[]>([]); // ✅ ใช้ BehaviorSubject เพื่อให้ UI อัปเดตอัตโนมัติ

//   constructor() {
//     this.loadFromLocalStorage(); // ✅ โหลดข้อมูลจาก LocalStorage เมื่อเริ่มแอป
//   }


//   //add
//   addItem(item: any) {
//     if (!this.selectedItems.some(i => i.menu_ID === item.menu_ID)) {
//       this.selectedItems.push(item);
//       this.saveToLocalStorage();
//       this.selectedItems$.next(this.selectedItems); // ✅ อัปเดต UI หลังเพิ่มเมนู
//     }
//   }

  
//   addtable(item: any) {
//     if (!this.selectedItems.some(i => i.id === item.id)) { // ใช้ item.id แทน menu_ID
//       this.selectedItems.push(item);
//       this.saveToLocalStorage();
//       this.selectedItems$.next(this.selectedItems);
//       console.log("📥 เพิ่มเข้าไปใน selectedItems:", this.selectedItems); // ตรวจสอบข้อมูลที่ถูกเพิ่ม
//     }
//   }
  
  

//   adddetail(item: any) {
//     if (!this.selectedItems.some(i => i.selectedMenus )) {
//       console.log("start")
//       this.selectedItems.push(item);
//       this.saveToLocalStorage();
//       this.selectedItems$.next(this.selectedItems); // ✅ อัปเดต UI หลังเพิ่มเมนู
//     }
//   }

//   //remove
//   removeItem(menuId: number) {
//     this.selectedItems = this.selectedItems.filter(item => item.menu_ID !== menuId);
//     this.saveToLocalStorage();
//     this.selectedItems$.next(this.selectedItems); // ✅ อัปเดต UI หลังลบเมนู
//   }

//   // removeTable(item: any) {
//   //   this.selectedItems = this.selectedItems.filter(i => i.id !== item.id); // ต้องเป็น !== เพื่อให้ลบออก
//   //   this.saveToLocalStorage();
//   //   this.selectedItems$.next(this.selectedItems); // ✅ อัปเดต UI หลังลบข้อมูล
//   // }
  
//   clearTables() {
//     this.selectedItems = []; // เคลียร์ทั้งหมด
//     this.saveToLocalStorage();
//     this.selectedItems$.next(this.selectedItems); // อัปเดต UI
//   }
  

//   /////////////////////////////////////////////////////////////////////////////////
//   getSelectedItems() {
//     return this.selectedItems;
//   }

//   isSelected(menuId: number): boolean {
//     return this.selectedItems.some(item => item.menu_ID === menuId);
//   }

//   //save local
//   saveToLocalStorage() {
//     console.log("บันทึกข้อมูลลง localStorage:", this.selectedItems); 
//     localStorage.setItem('selectedMenus', JSON.stringify(this.selectedItems));
//   }

//   //load data
//   private loadFromLocalStorage() {
//     const storedData = localStorage.getItem('selectedMenus');
//     if (storedData) {
//       this.selectedItems = JSON.parse(storedData);
//       this.selectedItems$.next(this.selectedItems); // ✅ อัปเดต UI หลังโหลดข้อมูลจาก LocalStorage
//     }
//   }

//   getSelectedItemsObservable() {
//     return this.selectedItems$.asObservable();
//   }


  

// }
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
