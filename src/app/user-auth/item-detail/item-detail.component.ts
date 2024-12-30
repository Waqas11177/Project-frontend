import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { Category } from '../Models/Category';
import { ParentCategory } from '../Models/ParentCategory';
import { ChildCategory } from '../Models/ChildCategory';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css'
})
export class ItemDetailComponent implements OnInit {

  tableData: { itemName: string, itemDescription: string, qty: number }[] = [
    { itemName: '', itemDescription: '', qty: 0 }  // Initial row
  ];

  // Function to add a new row
  addRow() {
    this.tableData.push({
      itemName: '',
      itemDescription: '',
      qty: 0
    });
  }
  removeRow(index: number) {
    console.warn(index);
    this.tableData.splice(index, 1);  // Remove the row at the given index
  }

  ngOnInit(): void {
    

  }

  itemDetailData: string = '';

  @Output() itemDetailChange = new EventEmitter<string>();

  onDetailChange() {
    this.itemDetailChange.emit(this.itemDetailData);
  }

  

 

  

  
  
  
}
