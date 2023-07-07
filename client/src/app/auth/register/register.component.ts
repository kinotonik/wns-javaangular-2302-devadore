import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    image: [null]
  }, {validator: this.matchPasswords});
  image: File | null = null;
  previewUrl: any = null;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  matchPasswords(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (
      passwordControl && confirmPasswordControl &&
      passwordControl.value !== confirmPasswordControl.value
    ) {
      confirmPasswordControl.setErrors({matchPasswords: true});
    } else {
      confirmPasswordControl!.setErrors(null);
    }
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files;
    if (file && file.length) {
      this.image = file[0];
      this.previewImage(this.image);
    }
  }

  previewImage(file: File) {
    // show preview
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  registerUser() {
    const formData = new FormData();
    formData.append('username', this.registerForm.get('username')?.value);
    formData.append('password', this.registerForm.get('password')?.value);
    formData.append('email', this.registerForm.get('email')?.value);
    if (this.image) {
      formData.append('image', this.image);
      formData.append('mimeType', this.image.type);
    }

    this.userService.register(formData).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/home'])
      },
      error => {
        console.log(error);
      }
    );
  }
}
