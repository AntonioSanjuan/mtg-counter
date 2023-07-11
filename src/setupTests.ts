// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
/* eslint-disable no-promise-executor-return */
/* eslint-disable camelcase */
import '@testing-library/jest-dom';

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({
    t: (str: any) => str,
    i18n: {
      changeLanguage: () => jest.fn(() => new Promise<void>((resolve) => resolve())),
    },
  }),
}));

jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'),
  getAuth: jest.fn(() => ({
    onAuthStateChanged: jest.fn((cb) => cb(undefined)),
    currentUser: undefined,
  })),
  getAdditionalUserInfo: jest.fn().mockReturnValue({
    isNewUser: false,
  }),
  getFirestore: () => ({}),
  setPersistence: () => ({}),
}));
