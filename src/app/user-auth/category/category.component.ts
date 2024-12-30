import { Component, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { ServiceService } from '../service/service.service';
import { Category } from '../Models/Category';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ParentCategory } from '../Models/ParentCategory';
import { ChildCategory } from '../Models/ChildCategory';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
  srno = 1;
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  categorylist!: Category[];
  categorylists!: ParentCategory[];
  Childlists!: ChildCategory[];
  Childlistss!: ChildCategory[];


  // selectedCategory: Category | null = null;
  selectchild: ChildCategory | null = null;
  childCatName: string = '';
  childCatid: number = 0;
  // selectchilds: ChildCategory = { id: 0, childCatName: '' };
  selectedCategory: string = '';
  updateparent:boolean=false;
  updatechild:string='';
  updatesubchild:string='';
  categorytype:string='';


  selectchilds: ChildCategory = { id: 0, childCatName: '' };

  constructor(private getcategory: ServiceService) { }

  openEditModal() {
    // this.selectedCategory = { ...item };  
    const modal = document.getElementById("editModal");
    if (modal != null) {

      modal.style.display = "block";
    }
  }
  openEditModals() {
    // this.selectedCategory = { ...item };  
    const modal = document.getElementById("editModals");
    if (modal != null) {

      modal.style.display = "block";
    }
  }

  closeEditModal() {
    const modal = document.getElementById("editModal");
    if (modal != null) {

      modal.style.display = "none";
    }
  }
  closeEditModals() {
    const modal = document.getElementById("editModals");
    if (modal != null) {

      modal.style.display = "none";
    }
  }

  trackById(index: number, item: any) {
    return item.id || index;
  }

  ngOnInit(): void {
    this.categorytype='C';
    this.updateparent=true;
    this.getCategories();
    this.getparentCategory();
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   processing: true
    // };
  }

  getCategories() {
    debugger;
    // this.getcategory.getcategory().subscribe((items: Category[]) => {
    //   this.categorylist = items;
      this.getcategory.GetParentCategory().subscribe((items: ParentCategory[]) => {
        debugger;
        this.categorylists = items;
    });
  }

  getparentCategory() {
    debugger;

    this.getcategory.GetParentCategory().subscribe((items: ParentCategory[]) => {
      this.categorylists = items;

    });;
  }

  getchildCategory(item: string) {
    debugger;
    this.getcategory.GetChildCategory(item).subscribe((items: ChildCategory[]) => {
      debugger;
      this.Childlists = items;
    });;
  }
  getsubchildCategory(item: string) {
    debugger;
    this.getcategory.GetChildCategory(item).subscribe((items: ChildCategory[]) => {
      debugger;
      this.Childlistss = items;
    });;
  }
 
  expandedRows: { [key: string]: boolean } = {};

  toggleRow(index: string | number) {
    this.expandedRows[index] = !this.expandedRows[index];
  }
  selectCategory(categoryName: string,id:number): void {
    debugger;
    this.childCatid=id;
    this.selectedCategory = categoryName;
    console.log('Selected Category:', this.selectedCategory);
  }
  saveChanges() {
    debugger;
    if (this.selectchilds && this.selectedCategory) {
      console.warn('Saving:', this.selectedCategory, this.selectchilds.childCatName);

      this.getcategory.createchildCategory(
        this.selectedCategory,
        this.selectchilds.childCatName,
        this.categorytype,
      ).subscribe(
        response => {
          console.log('Category updated successfully:', response);
          this.closeEditModal();
          this.getparentCategory(); // Refresh categories
          window.location.reload();
        },
        error => {
          console.error('Error updating category:', error);
          this.closeEditModal();
          this.getparentCategory();
        }
      );
    } else {
      console.warn('All fields are required to save changes.');
    }
  }
  updateChanges() {
    debugger;
    if (this.selectedCategory) {
      console.warn('Saving:',this.selectedCategory);
  
      this.getcategory.updateCategory(
        this.selectedCategory,
        this.childCatid

      ).subscribe(
        response => {
          console.log('Category updated successfully:', response); 
          this.closeEditModals();  
          this.getparentCategory(); 
          window.location.reload();
        },
        error => {
          console.error('Error updating category:', error); 
          this.closeEditModals();  
          this.getparentCategory();  
          window.location.reload();
        }
      );
    } else {
      console.warn('All fields are required to save changes.');
    }
  }
  

  childsaveChanges() {
    debugger;
    this.categorytype='S';
    if (this.selectchilds && this.selectedCategory) {
      console.warn('Saving:', this.selectedCategory, this.selectchilds.childCatName);

      this.getcategory.createchildCategory(
        this.selectedCategory,
        this.selectchilds.childCatName,
        this.categorytype,
      ).subscribe(
        response => {
          console.log('Category updated successfully:', response);
          this.closeEditModals();
          this.getparentCategory(); // Refresh categories
        },
        error => {
          console.error('Error updating category:', error);
          this.closeEditModals();
          this.getparentCategory();
        }
      );
    } else {
      console.warn('All fields are required to save changes.');
    }
  }
}
