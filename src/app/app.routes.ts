import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // path: './signup',
    path: '',
    loadChildren: () => import('./user-auth/user-auth.module').then(m => m.UserAuthModule)
  }
];
