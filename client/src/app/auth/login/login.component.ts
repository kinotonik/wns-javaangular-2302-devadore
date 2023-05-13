import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private authService: AuthService, private http: HttpClient, private router: Router) {
    this.loginForm = this.formBuilder.group({
      // Define your form controls here
      username: [''],
      password: [''],
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const {username, password} = this.loginForm.value;
    this.authService.authenticateUser(username, password).subscribe({
      next: (response) => {
        console.log('Response:', response);
        localStorage.setItem('jwt', response.token);
        console.log('JWT stocké :', localStorage.getItem('jwt'));
        localStorage.setItem('refreshToken', response.refreshToken);
        this.router.navigate(['/home']).then(() => {
          // This block of code will be executed when the navigation ends successfully.
          console.log('La navigation s\'est terminée avec succès');
        }).catch((error) => {
          console.error('Erreur de navigation:', error);
        });
      }
    })
  }
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  logout(): void {
    this.authService.logout().subscribe(() => {
      console.log('Logged out');
    });
  }
}

