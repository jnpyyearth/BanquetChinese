import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaindishComponent } from './maindish/maindish.component';
import { AppetizerComponent } from './appetizer/appetizer.component';
import { DrinksComponent } from './drinks/drinks.component';
import { DessertComponent } from './dessert/dessert.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiServiceService } from './Service/api-service.service';
import { PackageComponent } from './package/package.component';
import { PackageSizeComponent } from './package-size/package-size.component';
import { SidebarPackageComponent } from './sidebar-package/sidebar-package.component';
import { MaindishCardComponent } from './maindish/maindish-card/maindish-card.component';
import { DrinksCardComponent } from './drinks/drinks-card/drinks-card.component';


@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    MaindishComponent,
    AppetizerComponent,
    DrinksComponent,
    DessertComponent,
    RegisterComponent,
    PackageComponent,
    PackageSizeComponent,
    SidebarPackageComponent,
    MaindishCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    ApiServiceService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
