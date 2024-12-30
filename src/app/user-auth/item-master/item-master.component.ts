import { Component, OnInit } from '@angular/core';
import { CreateCategory } from '../Models/Category';
import { ParentCategory } from '../Models/ParentCategory';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { ItemViewModel } from '../Models/ItemRecord';
import { ChangeDetectorRef } from '@angular/core';
import {FormControl,FormControlName,FormGroup,Validators} from '@angular/forms'
class DetailViewModel {
  constructor(
    public id:number=0,
    public name: string = '',
    public description: string = '',
    public qty: any = ''
  ) {}
}
@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrl: './item-master.component.css'
})
export class ItemMasterComponent implements OnInit {

  constructor(private router: Router, private getcategory: ServiceService,private cdRef: ChangeDetectorRef) { }

  tableData: DetailViewModel[] = [];
  

  addRow() {
    debugger;
    const newRow = new DetailViewModel();
    this.tableData.push(newRow);
}

  removeRow(index: number) {
    debugger;
    this.tableData.splice(index, 1);  
  }
  trackByIndex(index: number, row: any): number {

    return index;
}

  loginData: CreateCategory = new CreateCategory();
  ItemData: ItemViewModel = new ItemViewModel();

  categorylists!: ParentCategory[];
  Master!: ParentCategory;
  selectedCategorys: string = '';
  childCatName: string = '';
  itemDetailData: string = '';
  searchTerm: number = 0; 


  getparentCategory() {
    this.getcategory.GetParentCategory().subscribe((items: ParentCategory[]) => {
      this.categorylists = items;
    });;
  }
  getmasterdata(id: number) {
    debugger;
    this.getcategory.GetMasterdata(id).subscribe(
        (response: any) => {
          debugger;
            if (!response.ItemName) {
              debugger;
                console.log('Item found:', response.itemName);

                debugger;
                this.selectedCategorys = response.itemName;  
            } else {
              debugger;
              this.selectedCategorys = '';

                console.error('Item not found.');
            }
        },
        (error) => {
          this.selectedCategorys = '';
            console.error('Error fetching master data:', error);

        }
    );
}


getdetaildata(id: number) {
  this.tableData = [{ id:0, name: '', description: '', qty: '' }];
  debugger;
  this.getcategory.GetDetaildata(id).subscribe(
    (response: any) => {
      debugger;

      if (response && response.length > 0) {
        console.log('Items found:', response.length);
        debugger;
        while (this.tableData.length < response.length) {
          this.tableData.push({id:0, name: '', description: '', qty: '' });
        }
        debugger;
        this.tableData = this.tableData.map((row, index) => {
          const resp = response[index] || {};  
          debugger;
          return { 
            id:resp.id || row.id,
            name: resp.name || row.name,        
            description: resp.description || row.description,
            qty: resp.qty || row.qty
          };
        });

        this.cdRef.detectChanges();

        console.log('Updated tableData:', this.tableData);
      } else {
        debugger;
      
        this.tableData[0] = {id:0, name: '', description: '', qty: '' };
        console.error('Item not found.');
      }
    },
    (error) => {
      debugger;
      this.tableData[0] = { id:0,name: '', description: '', qty: '' };
    
      console.error('Error fetching detail data:', error);
    }
    
  );
}



  ngOnInit(): void {
    this.getparentCategory();
    this.addRow();
  }

  cancel() {
    this.router.navigate(['/category']);
  }
  saveData(formValue: any) {
    if (formValue) {
      const itemData: ItemViewModel = new ItemViewModel();

      console.log("Form Value:", formValue);
  
      itemData.master = {
        id:this.searchTerm,
        itemName: this.selectedCategorys
      };
  
      itemData.detail = this.tableData.map(row => ({
        id:row.id,
        name: row.name,
        description: row.description,
        qty: row.qty
      }));
  
      console.log("Item Data to be sent:", itemData);
  
      this.getcategory.ItemRecord(itemData).subscribe(
        response => {
          console.log('Item saved successfully', response);
          this.router.navigate(['/signup']);
        },
        error => {
          console.error('Error saving data:', error);
        }
      );
      console.log('Form Submitted', formValue);
    } else {
      console.log('Form is invalid');
    }

    }
    
  


  onItemDetailChange(data: string) {
    this.itemDetailData = data;
  }
}
