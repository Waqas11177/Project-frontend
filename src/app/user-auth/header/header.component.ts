import { Component,AfterViewInit, OnInit  } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit  {
  constructor(private router: Router) {}
  ngOnInit(): void {}
  ngAfterViewInit() {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.querySelector('.menu');

    // Toggle the menu when hamburger icon is clicked
    menuToggle?.addEventListener('click', () => {
      menu?.classList.toggle('active');
    });
  }
  logout() {
    debugger; 
    localStorage.removeItem('authToken');
    localStorage.clear();
    this.router.navigate(['/signup']);
  }
  
}
