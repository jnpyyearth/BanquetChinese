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

  getTable():Observable<any>{
    console.log("Hello get Drink service");
    return this.http.get(`${apiUrl}/api/Table/GetTable`);
  }
  
   editmenu(menuData:any):Observable<any>{
    console.log("Hello editmenu service");
    return this.http.put(`${apiUrl}/api/Menu/EditMenu`,menuData);
  }


  cancelMenu(cancelMenuData:any):Observable<any>{
    console.log("Hello canclemenu service");
    return this.http.put(`${apiUrl}/api/Menu/CancelMenu/${cancelMenuData.Menu_ID}`,cancelMenuData);
  }
  updateMenu(updateMenuData:any):Observable<any[]>{
    return this.http.put<any[]>(`${apiUrl}/api/Menu/EditMenu/${updateMenuData.Menu_ID}`,updateMenuData);
  }
  getTableByID(Table_ID:number):Observable<any>{
    console.log("Hello getTableBy ID: ",Table_ID)
    return this.http.get(`${apiUrl}/api/Table/GetTableById/${Table_ID}`);
  }
  GetMyOrder(User_ID:number):Observable<any[]>{
    return this.http.get<any[]>(`${apiUrl}/api/orders/myOrder/${User_ID}`);
  }
  addOrder(orderData:any):Observable<any>{
    console.log("Hello add order",orderData);
    return this.http.post(`${apiUrl}/api/orders/addOrder`,orderData);
  }
  getOrderReport():Observable<any>{
    console.log("Hello getOrderReport");
    return this.http.get(`${apiUrl}/api/orders/getOrderReport`)
  }

  
}
