import { Observable } from 'rxjs';
import { User } from './user.model';

export interface DataStorageClass {
  getData(): Observable<User[]>;
  setData(user: User): void;
}
