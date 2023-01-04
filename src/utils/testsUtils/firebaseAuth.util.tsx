import { User } from 'firebase/auth';
import { auth } from '../firebase.util';

export async function mockFirebaseAuthUser(user: User | undefined, triggerOnAuthStateChanged = false) {
  Object.defineProperty(auth, 'currentUser', { value: user });

  if (triggerOnAuthStateChanged) {
    auth.onAuthStateChanged = await jest.fn((cb) => cb(user));
  }
}
