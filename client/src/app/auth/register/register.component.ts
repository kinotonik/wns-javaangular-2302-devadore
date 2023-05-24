import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  username!: string;
  password!: string;
  email!: string;
  hide = true;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }


  passwordMatchValidator(formGroup: FormGroup): void {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');
    if (password!.value !== confirmPassword!.value) {
      confirmPassword!.setErrors({mustMatch: true});
    } else {
      confirmPassword!.setErrors(null);
    }
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      console.log('Username:', this.username);
      console.log('Email:', this.email);
      console.log('Password:', this.password);

      const url = 'http://localhost:8080/auth/register';
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      const body = {username: this.username, password: this.password, email: this.email};

      this.http.post(url, body, {headers})
        .pipe(
          catchError((error) => {
            console.error('Error:', error);
            console.log('Error response:', error);
            throw error;
          })
        )
        .subscribe(() => {
          this.router.navigate(['/home']);
        });
    }

  }
}
