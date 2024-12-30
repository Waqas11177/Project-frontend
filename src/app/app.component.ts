import { Component,VERSION } from '@angular/core';
import { UserAuthModule } from "./user-auth/user-auth.module";

import { NgModule } from '@angular/core';
import {NgForm} from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {ServiceService} from './user-auth/service/service.service'
import { Signup } from './user-auth/Models/SignUp';
import { SidebarComponent } from "./user-auth/sidebar/sidebar.component";





@Component({
  selector: 'app-root',
  standalone:true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [UserAuthModule, NgbAccordionModule, FormsModule]
})
export class AppComponent {
  sidebarExpanded = true;
  title = 'Waqas';
  name:any;
  show=true;
  count=0;
  abc =12;
  updateitem="Ali";
  list:any[]=[];
  users={
    name:['Waqas','Shahzaib','Ali'],
    phone:['1','2','3']
  };
 constructor (private userData:ServiceService){

 }
  getName(name: string){
alert("Something went wrong")
  }
  Counter(type:string){
    
    type=="add"? this.count++:this.count--;
  };

  getusername(name:string){

    console.warn(name)
  };
  gettask(item:string){
    this.list.push({id:this.list.length,name:item})
    console.warn(this.list);
  }
  removetask(id:number){
    console.warn(id)
    this.list=this.list.filter(item=> item.id!==id)
  }
  UpdateDatas(item:string){

console.warn(item);
this.updateitem=item;
  }

  getuerformdata(data:Signup){
    return this.userData.saveusers(data).subscribe((resulut)=>{
      console.warn(resulut);
      
    })
  }
}
