import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login.component';
import { CredentialListComponent } from './credentials/credential-list.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CredentialDetailComponent } from './credentials/credential-detail/credential-detail.component';
import { CredentialFormComponent } from './credentials/credential-form/credential-form.component';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { 
        path: 'credentials',
        canActivate: [AuthGuard],
        children: [
            { path: '', component: CredentialListComponent},
            { path: 'add', component: CredentialFormComponent },
            { path: ':id', component: CredentialDetailComponent },
            { path: ':id/edit', component: CredentialFormComponent },
        ]
    }
];
