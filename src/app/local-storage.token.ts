import { InjectionToken } from '@angular/core';
import { DataStorageClass } from './storage-class.model';

export const LOCAL_STORAGE = new InjectionToken<DataStorageClass>(
  'LocalStorage'
);
