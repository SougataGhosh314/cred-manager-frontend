import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login.component';
import { CredentialListComponent } from './credentials/credential-list.component';
import { AuthGuard } from './core/guards/auth.guard';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'credentials', component: CredentialListComponent, canActivate: [AuthGuard] }
];
