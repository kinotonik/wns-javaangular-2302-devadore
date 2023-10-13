import {Component, HostListener} from '@angular/core';
import {AuthService} from "./services/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  constructor(private authService: AuthService) {
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    this.authService.clearToken();
  }

}
