import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: { message: string, type: 'success' | 'error' }[] = [];

  showToast(message: string, type: 'success' | 'error') {
    this.toasts.push({message, type});
    setTimeout(() => this.toasts.shift(), 3000); // disparaît après 3 secondes
  }
}
