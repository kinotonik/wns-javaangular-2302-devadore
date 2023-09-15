import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    toasts: { message: string, type: 'success' | 'error' | 'warning' }[] = [];

    showToast(message: string, type: 'success' | 'error' | 'warning') {
        this.toasts.push({message, type});
        setTimeout(() => this.toasts.shift(), 3000);
    }
}
