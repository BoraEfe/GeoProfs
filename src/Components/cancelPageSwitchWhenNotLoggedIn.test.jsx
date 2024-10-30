// cancel page switch test
test('check if page should switch', () => {
  expect(sessionStorage.getItem('isLoggedIn')).toBe('true');
});