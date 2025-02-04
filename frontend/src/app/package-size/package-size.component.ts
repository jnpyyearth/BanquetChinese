import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-package-size',
  standalone: false,
  templateUrl: './package-size.component.html',
  styleUrls: ['./package-size.component.css']
})
export class PackageSizeComponent {

  packageform = new FormGroup({
      namesname: new FormControl(''),
      province : new FormControl(''),
      place: new FormControl(''),
      datetime: new FormControl(''),
      phone : new FormControl(''),
    });
  router: any;
  

    onSubmit() {
        if (this.packageform.invalid) {
          Swal.fire({
            title: "กรุณากรอกข้อมูลให้ครบ",
            icon: "warning", 
            customClass: {
              title: "my-swal-title"
            }
          });          
          return; 
        }
        console.log('Form Data:', this.packageform.value);
        Swal.fire({
          title: "success",
          icon: "success",
          text: "เยี่ยมมาก ไปเลือกเมนูอาหารกัน",
          draggable: true
        }).then(() => {
          this.router.navigate(['/maindish']); 
        });
    }
}