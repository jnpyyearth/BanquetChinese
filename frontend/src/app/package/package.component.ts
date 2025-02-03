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
        this.tablesize =response.data;
        console.log("tablesize data:", this.tablesize);
        console.log(this.tablesize)

      },(error:any)=>{
        console.error('error')
      }
    )
  }
}
