import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { login } from '../Models/Login';  // Assuming this is the correct model for login
import { LoginResponse } from '../Models/Category';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  error: string | null = null; 
  token:string|null=null;
  successMessage: string | null = null; 

  // Define login data model
  loginData: login = new login();

  constructor(private router: Router, private loginService: ServiceService) { }

  ngOnInit(): void {}

  // Method to handle form submission
  getDataForm(form: any) {
    this.loginService.login(this.loginData).subscribe(
      (response: any) => { 
        debugger;
        const token = response.access_token; 
        debugger;
        localStorage.setItem('authToken', token);

  
        console.warn('Login successful', response.access_token);
        this.successMessage = 'Login successfully';
        this.error = null;
  
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
  
        this.router.navigate(['/category']);
      },
      (error) => {
        console.log(error);
        this.error = 'Invalid Credentials!';
        this.successMessage = null;
  
        // Hide error message after 3 seconds
        setTimeout(() => {
          this.error = null;
        }, 3000);
      }
    );
  }
}
