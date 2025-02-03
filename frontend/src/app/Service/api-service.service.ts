import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fork } from 'child_process';
import { Observable ,forkJoin} from 'rxjs';
import { map } from 'rxjs/operators';
const apiUrl ='http://localhost:5014'
const jsonUrl = '/menu-mapping.json';
@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {

  constructor(private http: HttpClient) { }
  Register(registerData:FormData):Observable<any>{
    console.log("hello register service");
    return this.http.post(`${apiUrl}/api/register/register`,registerData);
  }
  getMainDish():Observable<any>{
    console.log("Hello get maindish service");
    return this.http.get(`${apiUrl}/api/Menu/getMainDish`);
  }
  // getMainDish2():Observable<any>{
  //   return forkJoin({
  //     apiData:this.http.get<any>(`${apiUrl}/api/Menu/getMainDish`),
  //     jsonMapping:this.http.get<{[key:string]:string}>(`${jsonUrl}`)
  //   }).pipe(
  //     map(({apiData,jsonMapping})=>{
  //       console.log(apiData.data)
  //       return apiData.data.map((item:any)=>({
  //         ...item,menu_Name_TH:jsonMapping[item.menu_Name]||item.menu_Name
  //       }));
  //     })
  //   );
  // }
  getDessert():Observable<any>{
    console.log("Hello get dessert service");
    return this.http.get(`${apiUrl}/api/Menu/Getdessert`);
  }
  getAppetizer():Observable<any>{
    console.log("Hello get Appetizer service");
    return this.http.get(`${apiUrl}/api/Menu/GetAppetizer`);
  }
  

  getDrink():Observable<any>{
    console.log("Hello get Drink service");
    return this.http.get(`${apiUrl}/api/Menu/getDrink`);
  }
  uploadImage(imagedata:File):Observable<any>{
    const formData =new FormData();
    formData.append('file',imagedata);
    console.log("Hello service upload")
    return this.http.post(`${apiUrl}/api/file/upload`,formData);
  }
  addMenu(menuData:any):Observable<any>{
    console.log("Hello addmenu service");
    return this.http.post(`${apiUrl}/api/Menu/AddMenu`,menuData);
  }
}
