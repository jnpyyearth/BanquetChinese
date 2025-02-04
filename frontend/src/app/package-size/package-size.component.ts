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
    this.packageform = new FormGroup({
      namesname: new FormControl(localStorage.getItem('namesname') || '', Validators.required),
      province: new FormControl(localStorage.getItem('province') || '', Validators.required),
      place: new FormControl(localStorage.getItem('place') || '', Validators.required),
      date: new FormControl(localStorage.getItem('date') || '', Validators.required),
      phone: new FormControl(localStorage.getItem('phone') || '', Validators.required)
    });
  }

  ngOnInit() {
    this.packageform.valueChanges.subscribe(value => {
      localStorage.setItem('namesname', value.namesname);
      localStorage.setItem('province', value.province);
      localStorage.setItem('place', value.place);
      localStorage.setItem('date', value.date);
      localStorage.setItem('phone', value.phone);
    });
  }
  

  
  

  onSubmit() {
    if (this.packageform.invalid) {
      Swal.fire({
        title: "กรุณากรอกข้อมูลให้ครบ",
        icon: "warning",
      });
      return;
    }
    // อัปเดต localStorage หลังจาก submit ฟอร์ม
      localStorage.setItem('namesname', this.packageform.value.namesname);
      localStorage.setItem('province', this.packageform.value.province);
      localStorage.setItem('place', this.packageform.value.place);
      localStorage.setItem('date', this.packageform.value.date);
      localStorage.setItem('phone', this.packageform.value.phone);
        console.log('Form Data:', this.packageform.value);
    Swal.fire({
      title: "success",
      icon: "success",
      text: "เยี่ยมมาก ไปเลือกเมนูอาหารกัน",
      draggable: true
    }).then(() => {
      this.OrderService.adddetail(this.packageform.value);
      this.router.navigate(['/maindish']);
    });
  }


}