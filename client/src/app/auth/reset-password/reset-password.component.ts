import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {passwordValidator} from '../../validators/password.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  token: string | null;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required, passwordValidator]),
      confirmPassword: new FormControl('', [Validators.required, passwordValidator])
    }, {validators: this.matchPasswords});
  }

  get newPasswordErrors() {
    const newPassword = this.resetPasswordForm.get('newPassword')?.value;
    return {
      isLongEnough: newPassword.length >= 8,
      hasUppercase: /[A-Z]/.test(newPassword),
      hasLowercase: /[a-z]/.test(newPassword),
      hasSpecialChar: /[^\w\s]/.test(newPassword),
      hasNumber: /\d/.test(newPassword)
    };
  }

  matchPasswords(control: AbstractControl): null | object {
    const formGroup = control as FormGroup;
    const passwordControl = formGroup.get('newPassword');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
      return {passwordsDoNotMatch: true};
    }
    return null;
  }

  resetPassword(): void {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.get('newPassword')?.value;

      this.authService.resetPassword(newPassword, this.token).subscribe(
        success => {
          this.goToLoginPage();
        },
        error => {
          // Gérer l'erreur ici
        }
      );
    } else {
      // Gérer l'erreur ici
    }
  }

  goToLoginPage(): void {
    this.router.navigateByUrl('/auth/login');
  }
}
