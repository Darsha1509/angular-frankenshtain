import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from '../userInterface';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css'],
})
export class AddUserFormComponent implements OnInit {
  @Output() message: EventEmitter<User> = new EventEmitter<User>();
  user: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.user = new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]\d*$/),
      ]),
    });
  }

  sendData(user: User) {
    this.message.emit(user);
  }
}
