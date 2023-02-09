import { NextOrObserver, User } from 'firebase/auth';
import { auth } from '../firebase.util';

export async function mockFirebaseAuthUser(user: User | undefined, triggerOnAuthStateChanged = false) {
  Object.defineProperty(auth, 'currentUser', { value: user });

  if (triggerOnAuthStateChanged) {
    const unsubscriber = jest.fn();
    auth.onAuthStateChanged = jest.fn((cb: any) => {
      cb(user);
      return unsubscriber;
    });
  }
}
