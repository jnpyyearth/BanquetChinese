import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from '../../Service/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addmenu',
  standalone: false,
  
  templateUrl: './addmenu.component.html',
  styleUrl: './addmenu.component.css'
})
export class AddmenuComponent {

    addmenuForm!: FormGroup;
    selectedFile:File|null=null;
    fileUrl: string | null = null;
    constructor(private fb: FormBuilder,private apiService:ApiServiceService){
      this.addmenuForm =this.fb.group({
        menu_Name:['', Validators.required],
        menu_Type:['', Validators.required],
        menu_Price:['', [Validators.required,Validators.pattern("^[0-9]*$")]],
        // menu_Picturename:['',Validators.required]
      })
    }

  onFileSelected(event:any){
    this.selectedFile =event.target.files[0];
  }
  onSubmit(){
    if(!this.addmenuForm.valid){
      alert('invalid form');
      return;
    }
    if (!this.selectedFile) {
      alert('กรุณาเลือกไฟล์รูปภาพ');
      return;
    }
    this.apiService.uploadImage(this.selectedFile).subscribe(
      response=>{
        this.fileUrl =response.fileUrl;
        const menuData = {
          Menu_Name: this.addmenuForm.value.menu_Name,
          Menu_Type: this.addmenuForm.value.menu_Type,
          Menu_Price: this.addmenuForm.value.menu_Price,
          Menu_Picturename: this.fileUrl 
        };
        console.log(menuData)
        this.apiService.addMenu(menuData).subscribe(
          ()=>{
            console.log("add complete")
             Swal.fire('success', 'Addmenu succesccfully!', 'success');
            this.addmenuForm.reset();
          },
          error =>{
             Swal.fire('failed', 'Addmenu failed!', 'error');
            console.error("faild addmenu",error)
          }
        );
      },
      error=>{
        Swal.fire('failed', 'uploadImage failed!', 'error');
        console.error("faild upload Image",error);
      }
    );
  }
  }