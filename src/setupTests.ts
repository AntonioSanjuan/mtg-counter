// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({
    t: (str: any) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

jest.mock('firebase/auth', () => ({
  ...jest.requireActual('react-i18next'),
  getAuth: () => ({
    onAuthStateChanged: jest.fn(),
  }),
  getFirestore: () => ({}),
  setPersistence: () => ({}),
}));
