import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from '../userInterface';
import { DATA_STORAGE } from '../data-storage.injection-token';

@Component({
  selector: 'app-component2-nt',
  templateUrl: './component2-nt.component.html',
  styleUrls: ['./component2-nt.component.css'],
})
export class Component2NtComponent implements OnInit {
  users: User[];
  newUser: FormGroup;

  constructor(@Inject(DATA_STORAGE) private dataService) {}

  ngOnInit(): void {
    this.setUsers();

    this.newUser = new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]\d*$/),
      ]),
    });
  }

  onSubmit(user: User) {
    this.dataService.setData(user);
    this.setUsers();
  }

  private setUsers() {
    let users = [];
    this.dataService
      .getData()
      .subscribe((user: User) => {
        users.push(user);
      })
      .unsubscribe();
    this.users = users;
  }
}
