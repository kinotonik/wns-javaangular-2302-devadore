import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  errorMessage?: string;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.errorMessage = '';

    const email = this.forgotPasswordForm.get('email')?.value ?? '';

    this.http.post('https://your-backend-api.com/forgot-password', { email }).subscribe(
      (response: any) => {
        if (response.emailExists) {
          // Handle the forgot password request, e.g., show a success message
        } else {
          this.errorMessage = 'Email not found in the database.';
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred. Please try again later.';
      }
    );
  }

}
