import { Component,EventEmitter,OnInit ,Output,output} from '@angular/core';
import {FormControl,FormControlName,FormGroup,Validators} from '@angular/forms'
import { Signup } from '../Models/SignUp';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {
@Output() UpdateDataEvent=new EventEmitter<string> (); 


error: string | null = null; 
successMessage: string | null = null; 

loginform= new FormGroup({
  user: new FormControl('', [
    Validators.required,
    Validators.maxLength(10)
  ]),
  Lastname: new FormControl('', [
    Validators.required,
    Validators.maxLength(10)
  ]),
  // Lastname:new FormControl(''),
  password:new FormControl('',[Validators.required,Validators.minLength(5)]),
  email:new FormControl('',[Validators.required,Validators.email]
  )
})
constructor(private router: Router,private signupData: ServiceService) { }
getDataForm() {
  if (this.loginform.valid) {
    // Create an instance of Signup model and populate it with form data
    const signupData: Signup = new Signup();
    signupData.email = this.loginform.value.email!;
    signupData.lastName = this.loginform.value.Lastname!;
    signupData.password = this.loginform.value.password!;
    signupData.userName = this.loginform.value.user!;

    // Log the form data or send it to an API
    console.log(signupData);

    // Calling saveusers method from SignupService
    this.signupData.saveusers(signupData).subscribe(response => {
      console.log('User saved successfully', response);
      this.successMessage = 'User saved successfully';
      this.error = null; 
      setTimeout(() => {
        this.successMessage = null;
      }, 3000);
      this.router.navigate(['/signup']);
    }, error => {
      console.log(error);

      this.error = 'User already Exits in System';
      this.successMessage = null; 
      setTimeout(() => {
        this.error = null;
      }, 3000);
    });
  } else {
    console.log('Form is invalid');
  }
}



}
