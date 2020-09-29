import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { User } from '../userInterface';
import { DATA_STORAGE } from '../data-storage.injection-token';
import { LOCAL_STORAGE } from '../local-storage.injection-token';
import { LocalStorageService } from '../localStorage.service';

@Component({
  selector: 'app-component1-nt',
  templateUrl: './component1-nt.component.html',
  styleUrls: ['./component1-nt.component.css'],
  providers: [
    {
      provide: LOCAL_STORAGE,
      useClass: LocalStorageService,
    },
  ],
})
export class Component1NtComponent implements OnInit {
  users: User[];
  newUser: User;
  lsGetKey: FormControl;
  lsGetUser: User;

  constructor(
    @Inject(DATA_STORAGE) private dataService,
    @Inject(LOCAL_STORAGE) private localStorageService
  ) {}

  ngOnInit(): void {
    this.setUsers();
    this.lsGetKey = new FormControl();
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

  setUsualStoreMessage(user: User) {
    this.newUser = user;
    this.dataService.setData(user);
    this.setUsers();
  }

  setLocalStoreMessage(user: User) {
    this.localStorageService.setData(user.name, user);
  }

  getDataFromLocalStorage(key: string) {
    this.lsGetUser = JSON.parse(this.localStorageService.getData(key));
  }
}
