import { Component,OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-no-page',
  templateUrl: './no-page.component.html',
  styleUrl: './no-page.component.css',
})
export class NoPageComponent implements OnInit {


  @Input() abc ="coffee";

  newbeverage: string[] = ['Tea', 'Coffee', 'Juice', 'Water'];
constructor(){}
ngOnInit(): void{

}
addabc(newabc:string){
  debugger
this.newbeverage.push(newabc)
}
}
