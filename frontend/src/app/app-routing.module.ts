import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './mainpage/mainpage.component';
import { LoginComponent } from './login/login.component';
import { MaindishComponent } from './maindish/maindish.component';
import { AppetizerComponent } from './appetizer/appetizer.component';
import { DrinksComponent } from './drinks/drinks.component';
import { DessertComponent } from './dessert/dessert.component';
import { RegisterComponent } from './register/register.component';
import { HirelistComponent } from './hirelist/hirelist.component';

const routes: Routes = [
  { path: '', redirectTo: '/mainpage', pathMatch: 'full' },
  { path: 'mainpage', component: MainpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'maindish',component: MaindishComponent },
  { path: 'appetizer',component: AppetizerComponent },
  { path: 'drinks',component: DrinksComponent },
  { path: 'dessert',component: DessertComponent },
  { path: 'register',component: RegisterComponent },
  { path: 'hirelist',component: HirelistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
