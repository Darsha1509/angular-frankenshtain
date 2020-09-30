import { InjectionToken } from '@angular/core';
import { DataStorageClass } from './storage-class.model';

export const GLOBAL_STORAGE = new InjectionToken<DataStorageClass>(
  'GlobalStorage'
);
