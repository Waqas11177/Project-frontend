import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { StudentListComponent } from './student-list/student-list.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLinkActive, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { NoPageComponent } from '../no-page/no-page.component';
import {FooterComponent} from './footer/footer.component';
import {HttpClientModule} from '@angular/common/http'
import { SidebarComponent } from './sidebar/sidebar.component';
import {CategoryComponent} from './category/category.component';
import {DataTablesModule } from 'angular-datatables'
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CreateCategoryComponent } from './create-category/create-category.component';
import {MasterComponent} from './master/master.component';
import {DetailComponent} from './detail/detail.component';
import {ItemMasterComponent} from './item-master/item-master.component';
import {ItemDetailComponent} from './item-detail/item-detail.component';
import { AuthGuard } from './auth-guard.guard';





export const routes: Routes = [
  {
path:'login',
component:LoginComponent
},
{
  path:'signin',
  component:SigninComponent
  },
  {
    path:'signup',
    component:SignupComponent
    },
    {
      path:'category',
      component:CategoryComponent,
      canActivate: [AuthGuard]
      },
      {
        path:'createcategory',
        component:CreateCategoryComponent,
        canActivate: [AuthGuard]
        },
        {
          path:'master',
          component:MasterComponent,
          canActivate: [AuthGuard]
          },
          {
            path:'detail',
            component:DetailComponent,
            canActivate: [AuthGuard]
            },
            {
              path:'itemdetail',
              component:ItemMasterComponent,
              canActivate: [AuthGuard]
              },
    {
      path:'nopage',
      component:NoPageComponent
      },
];

@NgModule({
  declarations: [LoginComponent,SigninComponent,StudentListComponent,HeaderComponent,FooterComponent,SignupComponent,SidebarComponent,CategoryComponent,CreateCategoryComponent,MasterComponent,DetailComponent,ItemMasterComponent,ItemDetailComponent,NoPageComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,RouterOutlet,HttpClientModule,RouterModule.forChild(routes),DataTablesModule,MatInputModule,MatSelectModule,MatFormFieldModule
  ],
  exports:[LoginComponent,SigninComponent,StudentListComponent,HeaderComponent,FooterComponent,SignupComponent,SidebarComponent,CategoryComponent,CreateCategoryComponent,MasterComponent,DetailComponent,ItemMasterComponent,ItemDetailComponent,NoPageComponent],

})
export class UserAuthModule { }
