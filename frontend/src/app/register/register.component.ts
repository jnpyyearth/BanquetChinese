import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = {
    username: '',
    name: '',
    lastname: '',
    email: '',
    password: '',
    telephone: '',
  };

  onSubmit() {
    console.log('User registered:', this.user);
    // Add logic to handle form submission (e.g., send data to an API)
  }
}
