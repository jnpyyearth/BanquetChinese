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
  { path: 'package-size', component: PackageSizeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
