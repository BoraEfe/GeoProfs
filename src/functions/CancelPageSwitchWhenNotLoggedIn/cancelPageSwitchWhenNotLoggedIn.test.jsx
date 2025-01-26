import cancelPageSwitchWhenNotLoggedIn from "./cancelPageSwitchWhenNotLoggedIn";

// Test of de waarde 'false' is
test('check if page should switch is false', () => {
  expect(cancelPageSwitchWhenNotLoggedIn()).toBe(false);
});