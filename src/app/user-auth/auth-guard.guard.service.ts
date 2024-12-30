import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  isLoggedIn(): boolean {
    debugger
    const token = localStorage.getItem('authToken');
    if(token!=null){
        return true;
    }
    else{
        return false
    }
  }
}
