import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './mainpage/mainpage.component';
import { LoginComponent } from './login/login.component';
import { MaindishComponent } from './maindish/maindish.component';
import { AppetizerComponent } from './appetizer/appetizer.component';
import { DrinksComponent } from './drinks/drinks.component';
import { DessertComponent } from './dessert/dessert.component';
import { RegisterComponent } from './register/register.component';
import { ApiServiceService } from './Service/api-service.service';
import { AuthService } from './Service/auth.service';
import { PackageComponent } from './package/package.component';
import { PackageSizeComponent } from './package-size/package-size.component';
import { SidebarPackageComponent } from './sidebar-package/sidebar-package.component';
import { DrinksCardComponent } from './drinks/drinks-card/drinks-card.component';
import { MaindishCardComponent } from './maindish/maindish-card/maindish-card.component';
import { AddmenuComponent } from './admin/addmenu/addmenu.component';
import { SidebarAdminComponent } from './admin/sidebar-admin/sidebar-admin.component';
import { HirelistComponent } from './hirelist/hirelist.component';
import { OrderlistComponent } from './admin/orderlist/orderlist.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { ShowmenuComponent } from './admin/showmenu/showmenu.component';
import { ShowmaindishComponent } from './admin/showmaindish/showmaindish.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';

const routes: Routes = [
  { path: '', redirectTo: '/mainpage', pathMatch: 'full' },
  { path: 'mainpage', component: MainpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'maindish',component: MaindishComponent },
  { path: 'appetizer',component: AppetizerComponent },
  { path: 'drinks',component: DrinksComponent },
  { path: 'dessert',component: DessertComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'package', component: PackageComponent},
  { path: 'package-size', component: PackageSizeComponent},
  { path: 'sidebar-package', component: SidebarPackageComponent},
  { path: 'drinks-card', component: DrinksCardComponent},
  { path: 'maindish-card', component: MaindishCardComponent},
  { path: 'addmenu', component: AddmenuComponent},
  { path: 'sidebar-admin', component: SidebarAdminComponent},
  { path: 'hirelist', component: HirelistComponent},
  { path: 'orderlist', component: OrderlistComponent},
  { path: 'receipt', component: ReceiptComponent},
  
  { path: 'showmenu', component: ShowmenuComponent},
  { path: 'showmaindish', component: ShowmaindishComponent},
  {path:'confirmorder',component:ConfirmOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
