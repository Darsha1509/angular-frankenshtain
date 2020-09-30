import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../user.model';
import { GLOBAL_STORAGE } from '../global-storage.token';
import { LOCAL_STORAGE } from '../local-storage.token';
import { MemoryStorageService } from '../memory-storage.service';

@Component({
  selector: 'app-component2-nt',
  templateUrl: './component2-nt.component.html',
  styleUrls: ['./component2-nt.component.css'],
  providers: [
    {
      provide: LOCAL_STORAGE,
      useClass: MemoryStorageService,
    },
  ],
})
export class Component2NtComponent implements OnInit {
  users$: Observable<User[]>;
  localUsers$: Observable<User[]>;

  constructor(
    @Inject(GLOBAL_STORAGE) private dataService,
    @Inject(LOCAL_STORAGE) private localMemoryService
  ) {}

  ngOnInit(): void {
    this.users$ = this.dataService.getData();
    this.localUsers$ = this.localMemoryService.getData();
  }

  setUsualStoreMessage(user: User) {
    this.dataService.setData(user);
  }

  setLocalStoreMessage(user: User) {
    this.localMemoryService.setData(user);
  }
}
