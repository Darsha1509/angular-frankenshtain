import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { User } from './user.model';

@Injectable()
export class MemoryStorageService {
  data: User[] = [
    {
      name: 'Bob',
      age: 28,
    },
    {
      name: 'Tom',
      age: 45,
    },
    {
      name: 'Alice',
      age: 32,
    },
  ];

  getData() {
    return new BehaviorSubject(this.data);
  }

  setData(user: User) {
    this.data.push(user);
  }
}
