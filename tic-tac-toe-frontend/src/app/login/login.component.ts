import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { InputFieldComponent } from '../elements/input-field/input-field.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputFieldComponent, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userNameControl = new FormControl('');
  passwordControl = new FormControl('');
}
