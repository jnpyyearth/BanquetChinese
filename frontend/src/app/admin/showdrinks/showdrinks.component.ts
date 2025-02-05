import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ApiServiceService } from '../../Service/api-service.service';
import { AuthService } from '../../Service/auth.service';
import Swal from 'sweetalert2';
import { callbackify } from 'util';

@Component({
  selector: 'app-showdrinks',
  standalone: false,
  
  templateUrl: './showdrinks.component.html',
  styleUrl: './showdrinks.component.css'
})
export class ShowdrinksComponent implements OnInit{
  drinks: any = [];
  selectedDrink:any|null=null;
  isModalOpen: boolean = false; 
    constructor(private http: HttpClient, private authService: AuthService, private apiService: ApiServiceService, private cd: ChangeDetectorRef) { }
      ngOnInit(): void {
        this.apiService.getDrink()
         .pipe(
           map((response: any) => {
             console.log("Raw API response:", response);
             return Array.isArray(response.data) ? response.data.filter((drink:any) => drink.menu_Status === 0) : [];
           })
         )
         .subscribe(filterMenu => {
           this.drinks = filterMenu;
           console.log('Filtered data:', this.drinks);
         });
      }


      editDrink(drink:any):void{
         this.selectedDrink ={...drink}
         console.log(this.selectedDrink)
        
        
         this.isModalOpen = true;
      }
      cancelDrink(updateDrink: any): void {
        const cancelDrink={
          Menu_ID:updateDrink.menu_ID,
          Menu_Status:1
        }
        console.log(cancelDrink)
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
            this.apiService.cancelMenu(cancelDrink).subscribe(
              (response) => {
                console.log('Tour cancelled:', response);
    
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
      updateDrink():void{
        if(this.selectedDrink){
          const updateDrink={
            Menu_Name:this.selectedDrink.menu_Name,
            Menu_Price:this.selectedDrink.menu_Price,
            Menu_ID:this.selectedDrink.menu_ID
          };
          console.log("updatedrink data:",updateDrink)
          this.apiService.updateMenu(updateDrink).subscribe(
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
