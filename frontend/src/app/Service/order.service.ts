import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private selectedItems: any[] = [];
  private selectedItems$ = new BehaviorSubject<any[]>([]); // ✅ ใช้ BehaviorSubject เพื่อให้ UI อัปเดตอัตโนมัติ

  constructor() {
    this.loadFromLocalStorage(); // ✅ โหลดข้อมูลจาก LocalStorage เมื่อเริ่มแอป
  }


  //add
  addItem(item: any) {
    if (!this.selectedItems.some(i => i.menu_ID === item.menu_ID)) {
      this.selectedItems.push(item);
      this.saveToLocalStorage();
      this.selectedItems$.next(this.selectedItems); // ✅ อัปเดต UI หลังเพิ่มเมนู
    }
  }

  
  addtable(item: any) {
    if (!this.selectedItems.some(i => i.id === item.id)) { // ใช้ item.id แทน menu_ID
      this.selectedItems.push(item);
      this.saveToLocalStorage();
      this.selectedItems$.next(this.selectedItems);
      console.log("📥 เพิ่มเข้าไปใน selectedItems:", this.selectedItems); // ตรวจสอบข้อมูลที่ถูกเพิ่ม
    }
  }
  
  

  adddetail(item: any) {
    if (!this.selectedItems.some(i => i.selectedMenus )) {
      console.log("start")
      this.selectedItems.push(item);
      this.saveToLocalStorage();
      this.selectedItems$.next(this.selectedItems); // ✅ อัปเดต UI หลังเพิ่มเมนู
    }
  }

  //remove
  removeItem(menuId: number) {
    this.selectedItems = this.selectedItems.filter(item => item.menu_ID !== menuId);
    this.saveToLocalStorage();
    this.selectedItems$.next(this.selectedItems); // ✅ อัปเดต UI หลังลบเมนู
  }

  // removeTable(item: any) {
  //   this.selectedItems = this.selectedItems.filter(i => i.id !== item.id); // ต้องเป็น !== เพื่อให้ลบออก
  //   this.saveToLocalStorage();
  //   this.selectedItems$.next(this.selectedItems); // ✅ อัปเดต UI หลังลบข้อมูล
  // }
  
  clearTables() {
    this.selectedItems = []; // เคลียร์ทั้งหมด
    this.saveToLocalStorage();
    this.selectedItems$.next(this.selectedItems); // อัปเดต UI
  }
  

  /////////////////////////////////////////////////////////////////////////////////
  getSelectedItems() {
    return this.selectedItems;
  }

  isSelected(menuId: number): boolean {
    return this.selectedItems.some(item => item.menu_ID === menuId);
  }

  //save local
  saveToLocalStorage() {
    console.log("บันทึกข้อมูลลง localStorage:", this.selectedItems); 
    localStorage.setItem('selectedMenus', JSON.stringify(this.selectedItems));
  }

  //load data
  private loadFromLocalStorage() {
    const storedData = localStorage.getItem('selectedMenus');
    if (storedData) {
      this.selectedItems = JSON.parse(storedData);
      this.selectedItems$.next(this.selectedItems); // ✅ อัปเดต UI หลังโหลดข้อมูลจาก LocalStorage
    }
  }

  getSelectedItemsObservable() {
    return this.selectedItems$.asObservable();
  }


  

}
