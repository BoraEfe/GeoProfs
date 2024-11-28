import cancelPageSwitchWhenNotLoggedIn from "../CancelPageSwitchWhenNotLoggedIn/cancelPageSwitchWhenNotLoggedIn";

// Test of de waarde 'true' is
test('check if page should switch is true', () => {
  expect(cancelPageSwitchWhenNotLoggedIn()).toBe(true);
});

// Test of de waarde 'false' is
test('check if page should switch is false', () => {
  expect(cancelPageSwitchWhenNotLoggedIn()).toBe(false);
});