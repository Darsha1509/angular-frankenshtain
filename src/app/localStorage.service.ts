import { Injectable } from '@angular/core';

import { User } from './userInterface';

@Injectable()
export class LocalStorageService {
  getData(key: string): string {
    return localStorage.getItem(key);
  }

  setData(key: string, value: User): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
