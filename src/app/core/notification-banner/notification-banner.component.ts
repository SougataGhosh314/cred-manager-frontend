import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-notification-banner',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: "./notification-banner.component.html",
})
export class NotificationBannerComponent {
  constructor(public notificationService: NotificationService) {}
}
