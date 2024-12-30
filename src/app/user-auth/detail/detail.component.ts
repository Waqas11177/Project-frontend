import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Item } from '../Models/item';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnChanges {
  @Input() itemId: number | null = null;
  item: Item | undefined;


  constructor(private itemService: ServiceService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemId'] && this.itemId !== null) {
      this.itemService.getItemById(this.itemId).subscribe(item => {
        this.item = item;
      });
    }
  }
}
