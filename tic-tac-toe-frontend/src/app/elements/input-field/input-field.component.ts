import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css',
})
export class InputFieldComponent implements OnInit {
  @Input() label?: string;
  @Input() isPassword = false;
  @Input() control = new FormControl();
  @Input() error?: string;

  @Output() blur = new EventEmitter<void>();

  hide?: boolean;

  ngOnInit() {
    this.hide = this.isPassword;
  }
}
