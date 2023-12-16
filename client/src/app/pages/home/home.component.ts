import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {faCircleUser} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';
import {UserProfileService} from '../../services/user-profile-service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  faCircleUser = faCircleUser;
  isDropdownVisible: boolean = false;
  userImage: any;
  isAdmin: boolean = false;
  isUser: boolean = false;
  isLoggedIn = false;
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;
  user: User | null;
  isMenuHovered: boolean = false;
  showToast = false;
  toastMessage = '';
  toastType: 'confirm' | 'success' | 'error' | 'warning' = 'error';

  constructor(
    private authService: AuthService,
    private router: Router,
    private userProfileService: UserProfileService
  ) {
  }

  showDropdown() {
    this.isDropdownVisible = true;
  }

  hideDropdown() {
    this.isDropdownVisible = false;
  }

  showSubMenu(): void {
    this.isMenuHovered = true;
  }

  hideSubMenu(): void {
    this.isMenuHovered = false;
  }

  ngOnInit() {
    this.authService.checkAdminStatus();
    this.authService.isAdmin$.subscribe((isAdminValue) => {
      this.isAdmin = isAdminValue;
    });
    this.authService.checkUserStatus();
    this.authService.isUser$.subscribe((isUserValue) => {
      this.isUser = isUserValue;
    });
    this.userProfileService.getUserImage().subscribe((image) => {
      this.userImage = image;
    });
    this.userProfileService.getUser().subscribe((user) => {
      this.user = user;
    });
    /*   this.loadImage()*/
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.authService.setAdminState(false);
      this.authService.setUserState(false);
      this.isLoggedIn = false;
    });
  }

  private displayToast(message: string, type: 'confirm' | 'success' | 'error' | 'warning'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    
    setTimeout(() => this.showToast = false, 3000); // Hides the toast after 3 seconds
  }

  editUser(userId: number): void {
    if (!this.user) {
      this.displayToast('Les données de l\'utilisateur sont manquantes.', 'error');
      return;
    }

    if (this.user.id !== userId) {
      this.displayToast(`Erreur d'identification de l'utilisateur. On attend ${this.user.id}, mais on a obtenu ${userId}.`, 'error');
      return;
    }

    this.router.navigate(['/user-detail', userId]).then((success) => {
      if (!success) {
        this.displayToast('Échec de la navigation vers la page de détail de l\'utilisateur.', 'error');
      }
    });
  }

  handleButtonClick(): void {
    if (this.isAuthenticated()) {
      this.logout();
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
