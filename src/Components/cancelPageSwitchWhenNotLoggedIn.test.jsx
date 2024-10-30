// Mock sessionStorage
beforeEach(() => {
  Object.defineProperty(window, 'sessionStorage', {
    value: {
      storage: {},
      setItem(key, value) {
        this.storage[key] = value;
      },
      getItem(key) {
        return this.storage[key] || null;
      },
      removeItem(key) {
        delete this.storage[key];
      },
      clear() {
        this.storage = {};
      }
    },
    writable: true
  });
});

// Test of de waarde 'true' is
test('check if page should switch is true', () => {
  sessionStorage.setItem('isLoggedIn', 'true');
  expect(sessionStorage.getItem('isLoggedIn')).toBe('true');
});

// Test of de waarde 'false' is
test('check if page should switch is false', () => {
  sessionStorage.setItem('isLoggedIn', 'false');
  expect(sessionStorage.getItem('isLoggedIn')).toBe('false');
});

// Test of de waarde niet is ingesteld (null)
test('check if page should switch is null', () => {
  expect(sessionStorage.getItem('isLoggedIn')).toBeNull();
});