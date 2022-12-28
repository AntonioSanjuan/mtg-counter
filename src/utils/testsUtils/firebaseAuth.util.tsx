import { User } from 'firebase/auth';
import { auth } from '../firebase.util';

export function mockCurrentUser(user: User) {
  Object.defineProperty(auth, 'currentUser', { value: user });
}
