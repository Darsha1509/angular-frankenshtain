import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.css'],
})
export class SimpleFormComponent implements OnInit {
  profileForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', Validators.required],
    comment: [''],
  });

  emailErrorMessage: string = '';
  nameErrorMessage: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.onChanges();
  }

  onChanges(): void {
    this.profileForm.get('email').valueChanges.subscribe((val) => {
      if (this.profileForm.get('email').errors !== null) {
        if (this.profileForm.get('email').errors.hasOwnProperty('required')) {
          this.emailErrorMessage = 'Email is required!';
        } else if (
          this.profileForm.get('email').errors.hasOwnProperty('email')
        ) {
          this.emailErrorMessage = 'Invalid email!';
        }
      } else {
        this.emailErrorMessage = '';
      }
    });

    this.profileForm.get('name').valueChanges.subscribe((val) => {
      if (this.profileForm.get('name').errors !== null) {
        if (this.profileForm.get('name').errors.hasOwnProperty('required')) {
          this.nameErrorMessage = 'Name is required!';
        }
      } else {
        this.nameErrorMessage = '';
      }
    });
  }

  onSubmit() {
    console.log(this.profileForm.value);
  }
}

