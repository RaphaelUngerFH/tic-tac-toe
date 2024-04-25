import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InputFieldComponent } from '../../elements/input-field/input-field.component';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputFieldComponent, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userNameControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);

  userNameError?: string;
  passwordError?: string;

  // Validate a required input field and retrieve the error message if invalid
  static validateRequired(
    control: FormControl,
    label: string
  ): string | undefined {
    return control.errors && control.errors['required']
      ? 'The ' + label + ' is required!'
      : undefined;
  }

  constructor(
    protected router: Router,
    protected userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  // Submit the login form
  submit() {
    this.validateUserName();
    this.validatePassword();

    this.userNameControl.markAsTouched();
    this.passwordControl.markAsTouched();

    if (!this.userNameError && !this.passwordError) {
      this.userService
        .login(this.userNameControl.value!, this.passwordControl.value!)
        .subscribe({
          next: (res) => {
            console.log('login: ', res);
            this.router.navigate(['game']);
          },
          error: (error) => {
            this.showErrorSnackbar(error?.message);
          },
        });
    }
  }

  // Validate username input
  protected validateUserName() {
    this.userNameError = LoginComponent.validateRequired(
      this.userNameControl,
      'username'
    );
  }

  // Validate password input
  protected validatePassword() {
    this.passwordError = LoginComponent.validateRequired(
      this.passwordControl,
      'password'
    );
  }

  // Show error snack bar
  protected showErrorSnackbar(message: string) {
    this.snackBar.open(`Error: ${message}`, 'OK', { duration: 5000 });
  }
}