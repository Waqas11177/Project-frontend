import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: [`.custom{color:red}`]
})
export class SigninComponent {
  getDataForm(data:NgForm){
    console.warn(data)
  }
}
