export function createJsDomMatchMedia() {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

export function createJsDomWakeLock(exists = false) {
  Object.defineProperty(
    navigator,
    'wakeLock',
    exists ? {
      configurable: true,
      writable: true,
      value: {
        request: jest.fn(),
        release: jest.fn(),
      },
    } : {},
  );
}
