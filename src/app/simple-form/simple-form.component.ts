import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.css'],
})
export class SimpleFormComponent implements OnInit {

  profileForm: FormGroup;

  constructor() {}

  ngOnInit(): void {

    this.profileForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      name: new FormControl('', Validators.required),
      comment: new FormControl()
    });
  }

  get _email() {
    return this.profileForm.get('email');
  }

  get _name() {
    return this.profileForm.get('name');
  }

  onSubmit() {
    console.log(this.profileForm.value);
  }
}

