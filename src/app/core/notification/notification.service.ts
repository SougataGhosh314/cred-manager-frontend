import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _notification$ = new BehaviorSubject<Notification | null>(null);
  notification$ = this._notification$.asObservable();

  show(message: string, type: 'success' | 'error' = 'success') {
    this._notification$.next({ message, type });
    setTimeout(() => this.clear(), 5000); // auto-clear after 3s
  }

  clear() {
    this._notification$.next(null);
  }
}
