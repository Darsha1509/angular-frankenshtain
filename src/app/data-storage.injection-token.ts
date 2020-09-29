import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from './userInterface';

interface DataStorageClass {
  getData(): Observable<User>;
  setData(user: User): void;
}

export const DATA_STORAGE = new InjectionToken<DataStorageClass>('DataStorage');
