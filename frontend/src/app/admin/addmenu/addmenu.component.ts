import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-addmenu',
  standalone: false,
  
  templateUrl: './addmenu.component.html',
  styleUrl: './addmenu.component.css'
})
export class AddmenuComponent {
  addmenuform = new FormGroup({
    foodname: new FormControl(''),
    cost : new FormControl(''),
    category: new FormControl(''),
  });

  addmenuForm!: FormGroup;

  // constructor(private fb: FormBuilder) {
  //   this.myForm = this.fb.group({
  //     foodname: ['', Validators.required],  // ต้องกรอกชื่อเมนู
  //     foodpic: ['', Validators.required],  // ต้องกรอกภาพเมนู
  //     cost: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],  // ต้องกรอกราคาเป็นตัวเลขเท่านั้น
  //     category: ['', Validators.required] // ต้องเลือกประเภทหมวดหมู่
  //   });
  // }

  onSubmit() {
    // console.log('Form Data:', this.myForm.value);
    // alert('ข้อมูลถูกเพิ่มในระบบ success!!');
      if (this.addmenuForm.invalid) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        return; // หยุดการทำงานถ้าฟอร์มไม่ถูกต้อง
      }
    
      console.log('Form Data:', this.addmenuForm.value);
      alert('ข้อมูลถูกเพิ่มในระบบ success!!');
    
  }

  // onSubmit() {
  //   try {
  //     // จำลองการส่งข้อมูลไป API
  //     const formData = this.myForm.value;
      
  //     // สมมติว่ามีฟังก์ชันส่งข้อมูล
  //     this.sendDataToServer(formData)
  //       .then(response => {
  //         console.log('Form Data:', formData);
  //         alert('✅ ข้อมูลถูกเพิ่มในระบบสำเร็จ!');
  //       })
  //       .catch(error => {
  //         console.error('❌ เกิดข้อผิดพลาด:', error);
  //         alert('❌ ไม่สามารถเพิ่มข้อมูลได้ กรุณาลองอีกทีนะ');
  //       });
  
  //   } catch (error) {
  //     console.error('❌ ข้อผิดพลาดบางอย่างนะ:', error);
  //     alert('❌ มีบางอย่างผิดพลาด กรุณาติดต่ออาจารย์บุญชู');
  //   }
  // }

  onFileSelected(event: any): void {
    // const file = event.target.files[0];
    // if (file) {
    //   this.selectedFile = file;
    //   this.addTourForm.patchValue({ image: file });
    //   this.addTourForm.get('image')?.updateValueAndValidity();
    // }

    //event คือตัวแปรที่เราจะใส่ค่าที่ดึงมาจาก target file และบันทึกใน selectedfile **note จากเอิร์ธ**
  }


}
