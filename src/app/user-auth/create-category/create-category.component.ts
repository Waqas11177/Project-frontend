import { Component,OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { ParentCategory } from '../Models/ParentCategory';
import { Router } from '@angular/router';
import { Category, CreateCategory } from '../Models/Category';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent implements OnInit {

  loginData: CreateCategory = new CreateCategory();

  categorylists!: ParentCategory[];
  selectedCategorys:  string = '';
  childCatName: string = '';
  categorytype:string='';
  constructor(private router:Router,   private getcategory: ServiceService) { }
  getparentCategory() {
    this.getcategory.GetParentCategory().subscribe((items: ParentCategory[]) => {
      this.categorylists = items;
      console.warn(items);
    });;
  }
  ngOnInit(): void {
    this.getparentCategory();
  }

  cancel(){
    this.router.navigate(['/category']);
  }
  getSaveForm(form: any) {
    debugger;
    this.categorytype="P";
    this.loginData.name = this.selectedCategorys; 
    this.loginData.childCatName = form.childCatName; 
    this.loginData.type =  this.categorytype; 


    // Call CreateCategory API to save the data
    this.getcategory.CreateCategory(this.loginData).subscribe(response => {
      console.warn('Category saved successfully', response);
      setTimeout(() => {
        this.router.navigate(['/category']); 
      }, 1000);
    }, error => {
      console.log('Error:', error);
      setTimeout(() => {
        
      }, 1000);
    });
  }
}
