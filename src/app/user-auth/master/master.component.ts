import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';
import { ServiceService } from '../service/service.service';
import {Item} from '../Models/item'
import { Category } from '../Models/Category';
import { empty } from 'rxjs';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  items: Item[] = [];
  selectedItemId: number | null = null;
  @Input() abc ="tea";
  @Output() newabcevent=new EventEmitter<string>();
  constructor(private itemService: ServiceService) { }
addnewabc(value: string){

  debugger
  if(value!=""){
    this.newabcevent.emit(value)
  }
  else{
    console.warn("Value Not Null")
  }
}
  ngOnInit(): void {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  onSelectItem(id: number): void {
    this.selectedItemId = id;
  }
}
