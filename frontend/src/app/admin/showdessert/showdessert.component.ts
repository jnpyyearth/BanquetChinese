import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ApiServiceService } from '../../Service/api-service.service';
import { AuthService } from '../../Service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-showdessert',
  standalone: false,
  
  templateUrl: './showdessert.component.html',
  styleUrl: './showdessert.component.css'
})
export class ShowdessertComponent implements OnInit{
  desserts:any=[];
  selectedDessert:any|null=null;
  isModalOpen: boolean = false; 
  
    constructor(private http: HttpClient,private authService: AuthService,private apiService:ApiServiceService){}
      ngOnInit(): void {
        this.apiService.getDessert()
         .pipe(
           map((response: any) => {
             console.log("Raw API response:", response);
             return Array.isArray(response.data) ? response.data.filter((dessert:any) => dessert.menu_Status === 0) : [];
           })
         )
         .subscribe(filterMenu => {
           this.desserts = filterMenu;
           console.log('Filtered data:', this.desserts);
         });
      }
    editDessert(Dessert:any):void{
             this.selectedDessert ={...Dessert}
             console.log(this.selectedDessert)
            
            
             this.isModalOpen = true;
          }
          cancelDessert(updateDessert: any): void {
            const cancelDessert={
              Menu_ID:updateDessert.menu_ID,
              Menu_Status:1
            }
            console.log(cancelDessert)
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
              },
              buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
              title: "จะยกเลิกเมนูนี้หรือไม่?",
              text: "เมนูนี้สามารถกู้คืนได้ภายหลัง!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "ดำเนินการต่อ ",
              cancelButtonText: "ไม่ดำเนินการต่อ",
              reverseButtons: true
            }).then((result) => {
              if (result.isConfirmed) {
                this.apiService.cancelMenu(cancelDessert).subscribe(
                  (response) => {
                    console.log('cancelled:', response);
        
                    Swal.fire('ยกเลิกเมนูสำเสร็จ!', '', 'success');
                    this.ngOnInit(); // Refresh the data
                  },
                  (error) => {
                    console.log('id',)
                    console.error('Error cancelling program tour:', error);
                    Swal.fire('Error', 'There was an error cancelling the Menu .', 'error');
                  }
                );
              
              } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
              ) {
                swalWithBootstrapButtons.fire({
                  title: "ยกเลิกเมนูไม่สำเร็จ",
                  text: "",
                  icon: "error"
                });
              }
            });
            console.log("cancel card clicked")
          }
          closeModal(): void {
            this.isModalOpen = false;
        
          }
          updateDessert():void{
            if(this.selectedDessert){
              const updateDessert={
                Menu_Name:this.selectedDessert.menu_Name,
                Menu_Price:this.selectedDessert.menu_Price,
                Menu_ID:this.selectedDessert.menu_ID
              };
              console.log("updatedrink data:",updateDessert)
              this.apiService.updateMenu(updateDessert).subscribe(
                (response:any)=>{
                  console.log("update successfully",response)
                  Swal.fire('Success', 'Menu updated successfully!', 'success');
                  this.isModalOpen =false;
                  this.ngOnInit();
                },(error:any)=>{
                  console.error("error response",error);
                  Swal.fire('ไม่สามารถแก้ไขได้', '', 'error');
                }
              )
            }
          }
}

