import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from '../userInterface';
import { DATA_STORAGE } from '../data-storage.injection-token';

@Component({
  selector: 'app-component1-nt',
  templateUrl: './component1-nt.component.html',
  styleUrls: ['./component1-nt.component.css'],
})
export class Component1NtComponent implements OnInit {
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
        console.log(user);
        users.push(user);
      })
      .unsubscribe();
    this.users = users;
  }
}
