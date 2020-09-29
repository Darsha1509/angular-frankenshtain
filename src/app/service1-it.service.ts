import { Injectable } from '@angular/core';
import { from } from 'rxjs';

import { User } from './userInterface';

@Injectable()
export class DataStorage {
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
    return from(this.data);
  }

  setData(user: User) {
    this.data.push(user);
  }
}
