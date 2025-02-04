import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ApiServiceService } from '../../Service/api-service.service';
import { AuthService } from '../../Service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-showmaindish',
  standalone: false,
  
  templateUrl: './showmaindish.component.html',
  styleUrl: './showmaindish.component.css'
})
export class ShowmaindishComponent  implements OnInit{
   maindishes:any=[];
   selectedMainDish:any|null=null;
  isModalOpen: boolean = false; 
    constructor(private http: HttpClient,private authService: AuthService,private apiService:ApiServiceService){}
    ngOnInit(): void {
      this.apiService.getMainDish()
    .pipe(
      map((response: any) => {
        console.log("Raw API response:", response);
        return Array.isArray(response.data) ? response.data.filter((maindish:any) => maindish.menu_Status === 0) : [];
      })
    )
    .subscribe(filterMenu => {
      this.maindishes = filterMenu;
      console.log('Filtered data:', this.maindishes);
    });
    }
    
          editMaindish(Maindish:any):void{
             this.selectedMainDish ={...Maindish}
             console.log(this.selectedMainDish)
            
            
             this.isModalOpen = true;
          }
          cancelMainddish(updatemaindish: any): void {
            const cancelMaindish={
              Menu_ID:updatemaindish.menu_ID,
              Menu_Status:1
            }
            console.log(cancelMaindish)
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
                this.apiService.cancelMenu(cancelMaindish).subscribe(
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
          updateMaindish():void{
            if(this.selectedMainDish){
              const updateMaindish={
                Menu_Name:this.selectedMainDish.menu_Name,
                Menu_Price:this.selectedMainDish.menu_Price,
                Menu_ID:this.selectedMainDish.menu_ID
              };
              console.log("updatedrink data:",updateMaindish)
              this.apiService.updateMenu(updateMaindish).subscribe(
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
