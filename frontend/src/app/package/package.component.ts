import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../Service/api-service.service';

@Component({
  selector: 'app-package',
  standalone: false,
  
  templateUrl: './package.component.html',
  styleUrl: './package.component.css'
})
export class PackageComponent {

  tablesize:any=[];

  constructor(private http: HttpClient,private apiService:ApiServiceService){}

  ngOnInit(): void {

    this.apiService.getTable().subscribe(
      (response:any)=>{
        this.tablesize = response.data.map((item: any) => {
          // เปลี่ยนชื่อที่จะแสดงผล
          if (item.id === 1) {
            item.name = 'ชื่อใหม่ 1';  // เปลี่ยนชื่อที่จะแสดง
          } else if (item.id === 2) {
            item.name = 'ชื่อใหม่ 2';
          } else if (item.id === 3) {
            item.name = 'ชื่อใหม่ 3';
          }
          return item;
        });
        console.log("tablesize data:", this.tablesize);
        console.log(this.tablesize)

      },(error:any)=>{
        console.error('error')
      }
    )
  }
}
