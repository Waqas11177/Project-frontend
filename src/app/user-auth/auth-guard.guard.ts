import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth-guard.guard.service'; // Ensure you have an AuthService for authentication status

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      debugger
      return true; 
    } else {
      debugger
      this.router.navigate(['/signup']);
      return false;
    }
  }
}
