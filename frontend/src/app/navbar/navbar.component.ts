import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService,private router: Router,) {
    const navigation = this.router.getCurrentNavigation();
  
    

  // เข้าถึง loggedIn 
  if (navigation?.extras?.state?.['loggedIn']) {
    this.isLoggedIn = true; // ตั้งค่าสถานะการล็อกอินเป็น true
  }
  } 

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
  
  goToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout(); // เรียกใช้ฟังก์ชัน Logout
    this.isLoggedIn = false;
    this.router.navigate(['/']); // กลับไปหน้า Home
  }

}
