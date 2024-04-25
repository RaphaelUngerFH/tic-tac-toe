import { Component } from '@angular/core';
import { InputFieldComponent } from '../../elements/input-field/input-field.component';
import { MatButtonModule } from '@angular/material/button';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputFieldComponent, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent extends LoginComponent {
  passwordConfirmationControl = new FormControl('', [
    Validators.required,
    this.passwordConfirmationValidator(),
  ]);

  passwordConfirmationError?: string;

  // Submit the register form
  override submit() {
    this.validateUserName();
    this.validatePassword();
    this.validatePasswordConfirmation();

    this.userNameControl.markAsTouched();
    this.passwordControl.markAsTouched();
    this.passwordConfirmationControl.markAsTouched();

    if (
      !this.userNameError &&
      !this.passwordError &&
      !this.passwordConfirmationError
    ) {
      this.userService
        .register(this.userNameControl.value!, this.passwordControl.value!)
        .subscribe({
          next: (res) => {
            console.log('register: ', res);
            this.router.navigate(['game']);
          },
          error: (error) => {
            this.showErrorSnackbar(error?.message);
          },
        });
    }
  }

  // Validate password confirmation input
  private validatePasswordConfirmation() {
    this.passwordConfirmationError = LoginComponent.validateRequired(
      this.passwordConfirmationControl,
      'password confirmation'
    );

    if (
      !this.passwordConfirmationError &&
      this.passwordConfirmationControl.errors &&
      this.passwordConfirmationControl.errors['notIdentical']
    )
      this.passwordConfirmationError =
        'Both the password and the password confirmation need to be identical!';
  }

  // Validator to check whether the password and confirmed password are identical
  private passwordConfirmationValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let errors = null;
      console.log('validator', control.value);

      if (this.passwordControl.value !== control.value)
        errors = { notIdentical: true };
      return errors;
    };
  }
}
