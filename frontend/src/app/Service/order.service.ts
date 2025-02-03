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

  addItem(item: any) {
    if (!this.selectedItems.some(i => i.menu_ID === item.menu_ID)) {
      this.selectedItems.push(item);
      this.saveToLocalStorage();
      this.selectedItems$.next(this.selectedItems); // ✅ อัปเดต UI หลังเพิ่มเมนู
    }
  }

  removeItem(menuId: number) {
    this.selectedItems = this.selectedItems.filter(item => item.menu_ID !== menuId);
    this.saveToLocalStorage();
    this.selectedItems$.next(this.selectedItems); // ✅ อัปเดต UI หลังลบเมนู
  }

  getSelectedItems() {
    return this.selectedItems;
  }

  isSelected(menuId: number): boolean {
    return this.selectedItems.some(item => item.menu_ID === menuId);
  }

  private saveToLocalStorage() {
    localStorage.setItem('selectedMenus', JSON.stringify(this.selectedItems));
  }

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
