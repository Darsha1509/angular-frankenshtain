import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { User } from '../user.model';
import { GLOBAL_STORAGE } from '../global-storage.token';
import { LOCAL_STORAGE } from '../local-storage.token';
import { LocalStorageService } from '../local-storage.service';

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
  users$: Observable<User[]>;
  lsGetKey: FormControl;
  lsGetUser: User;

  constructor(
    @Inject(GLOBAL_STORAGE) private dataService,
    @Inject(LOCAL_STORAGE) private localStorageService
  ) {}

  ngOnInit(): void {
    this.users$ = this.dataService.getData();
    this.lsGetKey = new FormControl();
  }

  setUsualStoreMessage(user: User) {
    this.dataService.setData(user);
  }

  setLocalStoreMessage(user: User) {
    this.localStorageService.setData(user.name, user);
  }

  getDataFromLocalStorage(key: string) {
    this.lsGetUser = JSON.parse(this.localStorageService.getData(key));
  }
}
