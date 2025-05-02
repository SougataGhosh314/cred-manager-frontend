import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CredentialService } from '../credential.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Credential } from '../../models/credential';
import { NotificationService } from '../../core/notification/notification.service';

@Component({
  selector: 'app-credential-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './credential-form.component.html',
})
export class CredentialFormComponent {
  credential: Partial<Credential> = {};
  loading = false;

  credentialId?: number;
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private credentialService: CredentialService, 
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.credentialId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.credentialId;
  
    if (this.isEditMode) {
      this.loading = true;
      this.credentialService.getById(this.credentialId).subscribe({
        next: (cred) => {
          this.credential = {
            title: cred.title,
            username: cred.username,
            description: cred.description,
            password: '**********************', // Leave password empty or show placeholder if needed
          };
          this.loading = false;
        },
        error: () => {
          this.notificationService.show('Failed to load credential for editing.', 'error');
          this.loading = false;
        }
      });
    }
  }
  

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    this.loading = true;

    const dto = {
      title: this.credential.title!,
      username: this.credential.username!,
      password: this.credential.password!,
      description: this.credential.description,
    };

    if (this.isEditMode && this.credentialId) {
      this.credentialService.update(this.credentialId, dto).subscribe({
        next: () => {
          this.notificationService.show('Credential updated');
          this.router.navigate(['/credentials', this.credentialId]);
        },
        error: () => {
          this.notificationService.show('Failed to update credential', 'error');
          this.loading = false;
        }
      });
    } else {
      this.credentialService.create(dto).subscribe({
        next: () => {
          this.notificationService.show('Credential created');
          this.router.navigate(['/credentials']);
        },
        error: () => {
          this.notificationService.show('Failed to create credential', 'error');
          this.loading = false;
        }
      });
    }
  }

}
